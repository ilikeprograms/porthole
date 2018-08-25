import {of as observableOf, combineLatest as observableCombineLatest,  Observable } from 'rxjs';

import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { v4 as uuid } from 'uuid';

import { IAppState } from '../../ngrx/app-state.interface';
import { IKeyword } from '../keywords/keyword.interface';
import {
  CopyKeywordsAction, CopyNegativeKeywordsAction, ExportKeywordsAction, ImportFromChromeStorage,
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
import { AddClientAction, DeleteClientAction, EditClientAction } from '../clients/ngrx/clients.actions';
import {
  AddAdgroupAction, DeleteAdgroupAction,
  EditAdgroupAction
} from '../adgroups/ngrx/adgroup.actions';
import { selectAdgroupById, selectAllAdgroupIds, selectAllAdgroups } from '../adgroups/ngrx/adgroups.selectors';
import {
  AddKeywordAction,
  EditKeywordModifierAction,
  EditKeywordAction, RemoveAllKeywordsAction,
  RemoveSelectedKeywordsAction
} from '../keywords/ngrx/keywords.actions';
import {
  selectAllKeywords, selectedKeywordsByAdGroupId
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

    this.clientsWithCampaigns$ = observableCombineLatest(this.clients, this.campaigns$).pipe(
      map((values: [Array<IClient>, Array<ICampaign>]) => {
        return values[0].map((client: IClientWithCampaigns) => {
          const campaigns: Array<ICampaign> = [
            ...values[1]
          ];

          client.campaigns = campaigns.filter((campaign: ICampaign) => {
            return campaign.clientId === client.id;
          });

          return client;
        });
      }));

    this.addgroupsWithKeywords$ = observableCombineLatest(this.addgroups$, this.keywords, this.campaigns$).pipe(
      map((values: [Array<IAdgroup>, Array<IKeyword>, Array<ICampaign>]) => {
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
      }));

    this.keywordsCount = observableOf(0);

    this.allSelected = observableOf(false);

    this.keywordsSelectedCount = observableOf(0);

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

  public getKeywordsForAdgroup(adGroupId: string) {
    return this.store.select(selectedKeywordsByAdGroupId(adGroupId));
  }

  public addKeyword(adgroupId: string, text: string, modifier: KeywordModifiers): void {
    let adgroup: IAdgroup;

    this.store.select(selectAdgroupById(adgroupId)).pipe(take(1))
      .subscribe((adgroupById: IAdgroup) => {
        adgroup = adgroupById;
      });

    this.store.dispatch(new AddKeywordAction({
      keyword: {
        id: uuid(),
        adgroupId,
        text,
        modifier: modifier
      }
    }));
  }

  public editKeyword(id: string, text: string, modifier: KeywordModifiers): void {
    this.store.dispatch(new EditKeywordAction({
      keyword: {
        id,
        changes: {
          text,
          modifier
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

  public removeSelectedKeywords(ids: Array<string>): void {
    this.store.dispatch(new RemoveSelectedKeywordsAction(ids));
  }

  public removeAllKeywords(adgroupId: string): void {
    this.store.dispatch(new RemoveAllKeywordsAction(adgroupId));
  }


  // public changeNewKeywordOption(id: string, matchOption: KeywordModifiers): void {
  //   this.store.dispatch(new ChangeNewKeywordOptionAction({
  //     adgroup: {
  //      id,
  //      changes: {
  //        matchOption
  //      }
  //     }
  //   }));
  // }

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

  public exportKeywords(campaignName: string, adgroupName: string, keywords: Array<IKeyword>) {
    this.store.dispatch(new ExportKeywordsAction(campaignName, adgroupName, keywords));
  }
}
