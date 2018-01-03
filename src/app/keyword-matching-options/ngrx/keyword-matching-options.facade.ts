import { Injectable } from '@angular/core';

import { v4 as uuid } from 'uuid';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import { Store } from '@ngrx/store';

import { IAppState } from '../../ngrx/app-state.interface';
import { IKeyword } from '../keyword.interface';
import {
  selectAdgroups,
  selectKeywords
} from './keyword-matching-options.selectors';
import {
  AddAdgroupAction,
  AddKeywordAction, ChangeNewKeywordOptionAction, CopyAllKeywordsAction, DeleteAdgroupAction,
  EditAdgroupAction,
  EditKeywordModifierAction,
  EditKeywordTextAction, PasteKeywordsAction,
  RemoveAllKeywordsAction,
  RemoveKeywordAction,
  RemoveSelectedKeywordsAction,
  ToggleKeywordAllSelectedAction,
  ToggleKeywordSelectedAction
} from './keyword-matching-options.actions';
import { KeywordModifiers } from '../keyword-modifier-enum';
import { IClient } from '../client.interface';
import 'rxjs/add/operator/filter';
import { ICampaign } from '../campaign.interface';
import { IClientWithCampaigns } from '../client-with-campaigns.interface';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/combineLatest';
import { IAdgroup } from '../adgroup-interface';
import { IAddGroupWithKeywords } from '../addgroup-with-keywords.interface';
import { selectAllClients } from '../clients/ngrx/clients.selectors';
import { selectAllCampaigns } from '../campaigns/ngrx/campaigns.selectors';
import { AddCampaign, DeleteCampaignsAction, EditCampaign } from '../campaigns/ngrx/campaigns.actions';
import { AddClientAction, DeleteClientAction, EditClientAction } from '../clients/ngrx/clients-actions';

@Injectable()
export class KeywordMatchingOptionsFacade {
  public clients: Observable<Array<IClient>>;
  public campaigns$: Observable<Array<ICampaign>>;
  public addgroups$: Observable<Array<IAdgroup>>;
  public clientsWithCampaigns$: Observable<Array<IClientWithCampaigns>>;
  public addgroupsWithKeywords$: Observable<Array<IAddGroupWithKeywords>>;
  public keywords: Observable<Array<IKeyword>>;
  public keywordsCount: Observable<number>;
  public allSelected: Observable<boolean>;
  public keywordsSelectedCount: Observable<number>;

  constructor(private store: Store<IAppState>) {
    this.clients = this.store.select(selectAllClients);
    this.campaigns$ = this.store.select(selectAllCampaigns);
    this.addgroups$ = this.store.select(selectAdgroups);
    this.keywords = this.store.select(selectKeywords);

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

          addgroup.keywords = keywords.filter((keyword: IKeyword) => {
            return addgroup.keywordIds.indexOf(keyword.id) > -1;
          });

          const selectedKeywords: Array<IKeyword> = addgroup.keywords.filter((keyword: IKeyword) => {
            return keyword.selected;
          });

          addgroup.keywordSelectedCount = selectedKeywords.length;
          addgroup.keywordAllSelected = keywords.length === 0 ? false : (selectedKeywords.length === keywords.length);

          return addgroup;
        });
      });

    this.keywordsCount = Observable.of(0);

    this.allSelected = Observable.of(false);

    this.keywordsSelectedCount = Observable.of(0);
  }

  public addKeyword(addroupId: string, text: string): void {
    this.store.dispatch(new AddKeywordAction(addroupId, text));
  }

  public editKeywordText(id: string, text: string): void {
    this.store.dispatch(new EditKeywordTextAction(id, text));
  }

  public editKeywordModifier(id: string, modifier: KeywordModifiers): void {
    this.store.dispatch(new EditKeywordModifierAction(id, modifier));
  }

  public removeKeyword(addgroupId: string, id: string): void {
    this.store.dispatch(new RemoveKeywordAction(addgroupId, id));
  }

  public removeSelectedKeywords(addgroupId: string): void {
    this.store.dispatch(new RemoveSelectedKeywordsAction(addgroupId));
  }

  public removeAllKeywords(addgroupId: string): void {
    this.store.dispatch(new RemoveAllKeywordsAction(addgroupId));
  }

  public toggleKeywordSelected(id: string): void {
    this.store.dispatch(new ToggleKeywordSelectedAction(id));
  }

  public changeNewKeywordOption(addroupId: string, matchOption: KeywordModifiers): void {
    this.store.dispatch(new ChangeNewKeywordOptionAction(addroupId, matchOption));
  }

  public toggleAllSelected(addgroupId: string): void {
    this.store.dispatch(new ToggleKeywordAllSelectedAction(addgroupId));
  }

  public copyAllKeywords(addroupId: string): void {
    this.store.dispatch(new CopyAllKeywordsAction(addroupId));
  }

  public pasteKeywords(addroupId: string, text: string): void {
    this.store.dispatch(new PasteKeywordsAction(addroupId, text));
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
    this.store.dispatch(new AddAdgroupAction(name, campaignId));
  }

  public editAdgroup(id: string, name: string, campaignId: string): void {
    this.store.dispatch(new EditAdgroupAction(id, name, campaignId));
  }

  public deleteAdgroup(id: string) {
    this.store.dispatch(new DeleteAdgroupAction(id));
  }
}
