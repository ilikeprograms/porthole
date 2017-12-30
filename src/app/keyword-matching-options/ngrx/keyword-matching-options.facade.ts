import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import { Store } from '@ngrx/store';

import { IAppState } from '../../ngrx/app-state.interface';
import { IKeyword } from '../keyword.interface';
import {
  selectCampaigns,
  selectClients, selectKeywords
} from './keyword-matching-options.selectors';
import {
  AddCampaign,
  AddClientAction,
  AddKeywordAction, ChangeNewKeywordOptionAction, CopyAllKeywordsAction, DeleteCampaignsAction, EditCampaign,
  EditClientAction,
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

@Injectable()
export class KeywordMatchingOptionsFacade {
  public clients: Observable<Array<IClient>>;
  public campaigns$: Observable<Array<ICampaign>>;
  public clientsWithCampaigns$: Observable<Array<IClientWithCampaigns>>;
  public keywords: Observable<Array<IKeyword>>;
  public keywordsCount: Observable<number>;
  public allSelected: Observable<boolean>;
  public keywordsSelectedCount: Observable<number>;

  constructor(private store: Store<IAppState>) {
    this.clients = this.store.select(selectClients);
    this.campaigns$ = this.store.select(selectCampaigns);
    this.keywords = this.store.select(selectKeywords);

    this.clientsWithCampaigns$ = Observable.combineLatest(this.clients, this.campaigns$)
      .map((values: [Array<IClient>, Array<ICampaign>]) => {
        console.log(values);
        return values[0].map((client: IClientWithCampaigns) => {
          const campaigns: Array<ICampaign> = [
            ...values[1]
          ];

          client.campaigns = campaigns.filter((campaign: ICampaign) => {
            return client.campaignIds.indexOf(campaign.id) > -1;
          });

          return client;
        });
      });

    // this.matchOption = this.store.select(selectMatchOption);

    this.keywordsCount = Observable.of(0);

    // this.keywordsCount = this.store.select(selectKeywords).flatMap((keywords: Array<IKeyword>) => {
    //   return Observable.of(keywords.length);
    // });

    this.allSelected = Observable.of(false);

    // this.allSelected = this.keywords.flatMap((keywords: Array<IKeyword>) => {
    //   if (keywords.length === 0) {
    //     return Observable.of(false);
    //   }
    //
    //   const anyUnselectedKeywords: boolean = keywords.some((keyword: IKeyword) => {
    //     return !keyword.selected;
    //   });
    //
    //   return Observable.of(!anyUnselectedKeywords);
    // });

    this.keywordsSelectedCount = Observable.of(0);

    // this.keywordsSelectedCount = this.keywords.flatMap((keywords: Array<IKeyword>) => {
    //   return Observable.of(
    //     keywords.filter((keyword: IKeyword) => {
    //       return keyword.selected;
    //     }).length
    //   );
    // });
  }

  public keywordsByClientId(clientId: string): Observable<Array<IKeyword>> {
    return this.keywords.map((keywords: Array<IKeyword>) => {
      return keywords.filter((keyword: IKeyword) => {
        return keyword.clientId === clientId;
      });
    });
  }

  public keywordsByClientIdCount(clientId: string) {
    return this.keywordsByClientId(clientId).flatMap((keywords: Array<IKeyword>) => {
      return Observable.of(keywords.length);
    });
  }

  public keywordsByClientIdSelected(clientId: string) {
    return this.keywordsByClientId(clientId).flatMap((keywords: Array<IKeyword>) => {
        return Observable.of(
          keywords.filter((keyword: IKeyword) => {
            return keyword.selected;
          }).length
        );
      });
  }

  public keywordsByClientIdAllSelected(clientId: string) {
    return this.keywordsByClientId(clientId).flatMap((keywords: Array<IKeyword>) => {
      if (keywords.length === 0) {
        return Observable.of(false);
      }

      const anyUnselectedKeywords: boolean = keywords.some((keyword: IKeyword) => {
        return !keyword.selected;
      });

      return Observable.of(!anyUnselectedKeywords);
    });
  }

  public addKeyword(clientId: string, text: string): void {
    this.store.dispatch(new AddKeywordAction(clientId, text));
  }

  public editKeywordText(id: string, text: string): void {
    this.store.dispatch(new EditKeywordTextAction(id, text));
  }

  public editKeywordModifier(id: string, modifier: KeywordModifiers): void {
    this.store.dispatch(new EditKeywordModifierAction(id, modifier));
  }

  public removeKeyword(id: string): void {
    this.store.dispatch(new RemoveKeywordAction(id));
  }

  public removeSelectedKeywords(clientId: string): void {
    this.store.dispatch(new RemoveSelectedKeywordsAction(clientId));
  }

  public removeAllKeywords(clientId: string): void {
    this.store.dispatch(new RemoveAllKeywordsAction(clientId));
  }

  public toggleKeywordSelected(id: string): void {
    this.store.dispatch(new ToggleKeywordSelectedAction(id));
  }

  public changeNewKeywordOption(clientId: string, matchOption: KeywordModifiers): void {
    this.store.dispatch(new ChangeNewKeywordOptionAction(clientId, matchOption));
  }

  public toggleAllSelected(clientId: string): void {
    this.store.dispatch(new ToggleKeywordAllSelectedAction(clientId));
  }

  public copyAllKeywords(clientId: string): void {
    this.store.dispatch(new CopyAllKeywordsAction(clientId));
  }

  public pasteKeywords(clientId: string, text: string): void {
    this.store.dispatch(new PasteKeywordsAction(clientId, text));
  }

  public addClient(name: string): void {
    this.store.dispatch(new AddClientAction(name));
  }

  public editClient(id: string, name: string): void {
    this.store.dispatch(new EditClientAction(id, name));
  }

  public addCampaign(clientId: string, name: string): void {
    this.store.dispatch(new AddCampaign(clientId, name));
  }

  public editCampaign(id: string, name: string): void {
    this.store.dispatch(new EditCampaign(id, name));
  }

  public deleteCampaign(id: string, shouldDeleteAdgroups: boolean): void {
    this.store.dispatch(new DeleteCampaignsAction(id, shouldDeleteAdgroups));
  }
}
