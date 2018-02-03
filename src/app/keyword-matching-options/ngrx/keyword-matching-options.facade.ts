import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { v4 as uuid } from 'uuid';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/combineLatest';

import { IAppState } from '../../ngrx/app-state.interface';
import { IKeyword } from '../keywords/keyword.interface';
import {
  CopyKeywordsAction, CopyNegativeKeywordsAction, ImportFromChromeStorage,
  PasteKeywordsAction, PasteNegativeKeywordsAction
} from './keyword-matching-options.actions';
import { KeywordModifiers } from '../keywords/keyword-modifier-enum';
import { IClient } from '../clients/client.interface';
import { ICampaign } from '../campaigns/campaign.interface';
import { IClientWithCampaigns } from '../clients/client-with-campaigns.interface';
import { IAdgroup } from '../adgroups/adgroup-interface';
import { IAddGroupWithKeywords } from '../addgroup-with-keywords.interface';
import { selectAllClients } from '../clients/ngrx/clients.selectors';
import { selectAllCampaigns } from '../campaigns/ngrx/campaigns.selectors';
import { AddCampaign, DeleteCampaignsAction, EditCampaign } from '../campaigns/ngrx/campaigns.actions';
import { AddClientAction, DeleteClientAction, EditClientAction } from '../clients/ngrx/clients-actions';
import {
  AddAdgroupAction, ChangeNewKeywordOptionAction, DeleteAdgroupAction,
  EditAdgroupAction
} from '../adgroups/ngrx/adgroup.actions';
import { selectAdgroupById, selectAllAdgroupIds, selectAllAdgroups } from '../adgroups/ngrx/adgroups.selectors';
import {
  AddKeywordAction, EditKeywordModifierAction, EditKeywordTextAction,
  RemoveAllKeywordsAction,
  RemoveKeywordAction, RemoveSelectedKeywordsAction, ToggleKeywordAllSelectedAction, ToggleKeywordSelectedAction
} from '../keywords/ngrx/keywords.actions';
import {
  keywordsAllSelectedByAdGroupId,
  selectAllKeywords, selectedKeywordsByAdGroupId,
  selectedKeywordsCountByAdGroupId
} from '../keywords/ngrx/keywords.selectors';
import { environment } from '../../../environments/environment';
import { ChromeStorageService } from '../../core/chrome-storage.service';

@Injectable()
export class KeywordMatchingOptionsFacade {
  public clients: Observable<Array<IClient>>;
  public campaigns$: Observable<Array<ICampaign>>;
  public addgroups$: Observable<Array<IAdgroup>>;
  public addgroupIds$: Observable<Array<string>>;
  public clientsWithCampaigns$: Observable<Array<IClientWithCampaigns>>;
  public addgroupsWithKeywords$: Observable<Array<IAddGroupWithKeywords>>;
  public keywords: Observable<Array<IKeyword>>;
  public keywordsCount: Observable<number>;
  public allSelected: Observable<boolean>;
  public keywordsSelectedCount: Observable<number>;

  constructor(private store: Store<IAppState>, private chromeStorageService: ChromeStorageService) {
    this.clients = this.store.select(selectAllClients);
    this.campaigns$ = this.store.select(selectAllCampaigns);
    this.addgroups$ = this.store.select(selectAllAdgroups);
    this.addgroupIds$ = this.store.select(selectAllAdgroupIds) as any;
    this.keywords = this.store.select(selectAllKeywords);

    this.clientsWithCampaigns$ = Observable.combineLatest(this.clients, this.campaigns$)
      .map((values: [Array<IClient>, Array<ICampaign>]) => {
        return values[0].map((client: IClientWithCampaigns) => {
          const campaigns: Array<ICampaign> = [
            ...values[1]
          ];

          client.campaigns = campaigns.filter((campaign: ICampaign) => {
            return campaign.clientId === client.id;
          });

          return client;
        });
      });

    this.addgroupsWithKeywords$ = Observable.combineLatest(this.addgroups$, this.keywords, this.campaigns$)
      .map((values: [Array<IAdgroup>, Array<IKeyword>, Array<ICampaign>]) => {
        return values[0].map((addgroup: IAddGroupWithKeywords) => {
          const keywords: Array<IKeyword> = [
            ...values[1]
          ];

          if (addgroup.campaignId) {
            addgroup.campaign = values[2].filter((campaign: ICampaign) => {
              return campaign.id === addgroup.campaignId;
            })[0];
          } else {
            addgroup.campaign = undefined;
          }

          // addgroup.keywords = keywords.filter((keyword: IKeyword) => {
          //   return keyword.adgroupId === addgroup.id;
          // });
          //
          // const selectedKeywords: Array<IKeyword> = addgroup.keywords.filter((keyword: IKeyword) => {
          //   return keyword.selected;
          // });

          // addgroup.keywordSelectedCount = selectedKeywords.length;
          // addgroup.keywordAllSelected = keywords.length === 0 ? false : (selectedKeywords.length === keywords.length);

          return addgroup;
        });
      });

    this.keywordsCount = Observable.of(0);

    this.allSelected = Observable.of(false);

    this.keywordsSelectedCount = Observable.of(0);

    // Get the previously stored state and import it
    this.chromeStorageService.sync.get(environment.storageKey, (appState) => {
      if (appState && appState[environment.storageKey]) {
        this.importFromChromeStorage(appState[environment.storageKey]);
      } else {
        this.chromeStorageService.initialised = true;
      }
    });
  }

  public importFromChromeStorage(data): void {
    this.store.dispatch(new ImportFromChromeStorage(data));
  }

  public getAdgroupById(adGroupId: string) {
    return this.store.select(selectAdgroupById(adGroupId));
  }

  public getKeywordsForAdgroup(adGroupId: string) {
    return this.store.select(selectedKeywordsByAdGroupId(adGroupId));
  }

  public getSelectedKeywordsCountForAdgroup(adGroupId: string) {
    return this.store.select(selectedKeywordsCountByAdGroupId(adGroupId));
  }

  public getKeywordsAllSelectedForAdgroup(adGroupId: string) {
    return this.store.select(keywordsAllSelectedByAdGroupId(adGroupId));
  }

  public addKeyword(adgroupId: string, text: string): void {
    let adgroup: IAdgroup;

    this.store.select(selectAdgroupById(adgroupId)).take(1)
      .subscribe((adgroupById: IAdgroup) => {
        adgroup = adgroupById;
      });

    this.store.dispatch(new AddKeywordAction({
      keyword: {
        id: uuid(),
        adgroupId,
        text,
        selected: false,
        modifier: adgroup.matchOption
      }
    }));
  }

  public editKeywordText(id: string, text: string): void {
    this.store.dispatch(new EditKeywordTextAction({
      keyword: {
        id,
        changes: {
          text
        }
      }
    }));
  }

  public editKeywordModifier(id: string, modifier: KeywordModifiers): void {
    this.store.dispatch(new EditKeywordModifierAction({
      keyword: {
        id,
        changes: {
          modifier
        }
      },
    }));
  }

  public removeKeyword(id: string): void {
    this.store.dispatch(new RemoveKeywordAction({
      id
    }));
  }

  public removeSelectedKeywords(adgroupId: string): void {
    this.store.dispatch(new RemoveSelectedKeywordsAction({
      adgroupId
    }));
  }

  public removeAllKeywords(adgroupId: string): void {
    this.store.dispatch(new RemoveAllKeywordsAction({
      adgroupId
    }));
  }

  public toggleKeywordSelected(id: string): void {
    this.store.dispatch(new ToggleKeywordSelectedAction({
      id
    }));
  }

  public changeNewKeywordOption(id: string, matchOption: KeywordModifiers): void {
    this.store.dispatch(new ChangeNewKeywordOptionAction({
      adgroup: {
       id,
       changes: {
         matchOption
       }
      }
    }));
  }

  public toggleAllSelected(adgroupId: string): void {
    this.store.dispatch(new ToggleKeywordAllSelectedAction({
      adgroupId
    }));
  }

  public copyKeywords(adgroupId: string): void {
    this.store.dispatch(new CopyKeywordsAction({
      adgroupId
    }));
  }


  public copyNegativeKeywords(adgroupId: string): void {
      this.store.dispatch(new CopyNegativeKeywordsAction({
      adgroupId
    }));
  }

  public pasteKeywords(adgroupId: string, text: string): void {
    this.store.dispatch(new PasteKeywordsAction({
      adgroupId,
      text
    }));
  }

  public pasteNegativeKeywords(adgroupId: string, text: string): void {
    this.store.dispatch(new PasteNegativeKeywordsAction({
      adgroupId,
      text
    }));
  }

  public addClient(name: string): void {
    const client: IClient = {
      id: uuid(),
      name: name,
      campaignIds: []
    };

    this.store.dispatch(new AddClientAction({
      client
    }));
  }

  public editClient(id: string, name: string): void {
    this.store.dispatch(new EditClientAction({
      client: {
        id: id,
        changes: {
          name
        }
      }
    }));
  }

  public deleteClient(id: string) {
    this.store.dispatch(new DeleteClientAction({
      id
    }));
  }

  public addCampaign(clientId: string, name: string): void {
    this.store.dispatch(new AddCampaign({
      campaign: {
        id: uuid(),
        name,
        clientId
      }
    }));
  }

  public editCampaign(id: string, name: string): void {
    this.store.dispatch(new EditCampaign({
      campaign: {
        id,
        changes: {
          name
        }
      }
    }));
  }

  public deleteCampaign(id: string, shouldDeleteAdgroups: boolean): void {
    this.store.dispatch(new DeleteCampaignsAction({
      id,
      shouldDeleteAdgroups
    }));
  }

  public addAdgroup(name: string, campaignId: string): void {
    this.store.dispatch(new AddAdgroupAction({
      adgroup: {
        id: uuid(),
        name,
        campaignId,
        matchOption: KeywordModifiers.BroadMatch
      }
    }));
  }

  public editAdgroup(id: string, name: string, campaignId: string): void {
    this.store.dispatch(new EditAdgroupAction({
      adgroup: {
        id,
        changes: {
          name,
          campaignId
        }
      }
    }));
  }

  public deleteAdgroup(id: string) {
    this.store.dispatch(new DeleteAdgroupAction({
      id
    }));
  }
}
