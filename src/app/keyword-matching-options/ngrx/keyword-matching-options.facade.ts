import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import { Store } from '@ngrx/store';

import { IAppState } from '../../ngrx/app-state.interface';
import { IKeyword } from '../keyword.interface';
import {
  selectAdgroups,
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
import { IAdgroup } from '../adgroup-interface';
import { IAddGroupWithKeywords } from '../addgroup-with-keywords.interface';

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
    this.clients = this.store.select(selectClients);
    this.campaigns$ = this.store.select(selectCampaigns);
    this.addgroups$ = this.store.select(selectAdgroups);
    this.keywords = this.store.select(selectKeywords);

    this.clientsWithCampaigns$ = Observable.combineLatest(this.clients, this.campaigns$)
      .map((values: [Array<IClient>, Array<ICampaign>]) => {
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

    this.addgroupsWithKeywords$ = Observable.combineLatest(this.addgroups$, this.keywords)
      .map((values: [Array<IAdgroup>, Array<IKeyword>]) => {
        console.log(values);
        return values[0].map((addgroup: IAddGroupWithKeywords) => {
          const keywords: Array<IKeyword> = [
            ...values[1]
          ];

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
