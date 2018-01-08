import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';

import { MaterialImportsModule } from '../material-imports.module';
import { KeywordListComponent } from './keywords/keyword-list/keyword-list.component';
import { KeywordIconComponent } from './keywords/keyword-icon/keyword-icon.component';
import { KeywordMatchingOptionsFacade } from './ngrx/keyword-matching-options.facade';
import { KeywordFooterActionsComponent } from './keywords/keyword-footer-actions/keyword-footer-actions.component';
import { AddKeywordComponent } from './keywords/add-keyword/add-keyword.component';
import { KeywordCardComponent } from './keywords/keyword-card/keyword-card.component';
import { NoKeywordComponent } from './keywords/no-keyword/no-keyword.component';
import { DeleteAllConfirmComponent } from './adgroups/delete-all-confirm/delete-all-confirm.component';
import { KeywordMatchingOptionsEffects } from './ngrx/keyword-matching-options.effects';
import { PasteModalComponent } from './keywords/paste-modal/paste-modal.component';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { KeywordMatchingOptionsTabsComponent } from './keyword-matching-options-tabs/keyword-matching-options-tabs';
import { ClientAddModalComponent } from './clients/client-add-modal/client-add-modal.component';
import { CampaignDeleteModalComponent } from './campaigns/campaign-delete-modal/campaign-delete-modal';
import { CampaignModalComponent } from './campaigns/campaign-modal/campaign-modal.component';
import { KeywordCardListComponent } from './adgroups/keyword-card-list/keyword-card-list.component';
import { AdgroupModalComponent } from './adgroups/adgroup-modal/adgroup-modal.component';
import { DeleteAdgroupConfirmComponent } from './adgroups/delete-adgroup-confirm-modal/delete-addgroup-confirm-modal';
import { DeleteClientConfirmComponent } from './clients/delete-client-confirm-modal/delete-client-confirm-modal';
import { ActionReducerMap, META_REDUCERS, MetaReducer, StoreModule } from '@ngrx/store';
import { clientsReducer } from './clients/ngrx/clients.reducer';
import { ClientsDefaultState } from './clients/ngrx/clients-default.state';
import { campaignsReducer } from './campaigns/ngrx/campaigns.reducer';
import { CampaignsDefaultState } from './campaigns/ngrx/campaigns-default.state';
import { adgroupReducer } from './adgroups/ngrx/adgroup.reducer';
import { AdgroupDefaultState } from './adgroups/ngrx/adgroup-default.state';
import { keywordsReducer } from './keywords/ngrx/keywords.reducer';
import { KeywordsDefaultState } from './keywords/ngrx/keywords-default.state';

export const KEYWORD_MATCHING_OPTIONS_REDUCERS_TOKEN = new InjectionToken<ActionReducerMap<any>>('keywordMatchingOptions');

export function getReducers(): ActionReducerMap<any> {
  return {
    clients: clientsReducer,
    campaigns: campaignsReducer,
    adgroups: adgroupReducer,
    keywords: keywordsReducer
  };
}

export function getInitialState() {
  return {
    clients: ClientsDefaultState,
    campaigns: CampaignsDefaultState,
    adgroups: AdgroupDefaultState,
    keywords: KeywordsDefaultState
  };
}

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MaterialImportsModule,
    StoreModule.forFeature('keywordMatchingOptions', KEYWORD_MATCHING_OPTIONS_REDUCERS_TOKEN, {
      initialState: getInitialState
    }),
    EffectsModule.forFeature([KeywordMatchingOptionsEffects])
  ],
  declarations: [
    KeywordMatchingOptionsTabsComponent,
    KeywordListComponent,
    KeywordCardListComponent,
    ClientListComponent,
    AddKeywordComponent,
    NoKeywordComponent,
    KeywordCardComponent,
    KeywordIconComponent,
    KeywordFooterActionsComponent,
    DeleteAllConfirmComponent,
    PasteModalComponent,
    ClientAddModalComponent,
    CampaignDeleteModalComponent,
    CampaignModalComponent,
    AdgroupModalComponent,
    DeleteAdgroupConfirmComponent,
    DeleteClientConfirmComponent
  ],
  exports: [
    KeywordMatchingOptionsTabsComponent
  ],
  providers: [
    KeywordMatchingOptionsFacade,
    {
      provide: KEYWORD_MATCHING_OPTIONS_REDUCERS_TOKEN,
      useFactory: getReducers
    },
  ],
  entryComponents: [
    DeleteAllConfirmComponent,
    PasteModalComponent,
    ClientAddModalComponent,
    CampaignDeleteModalComponent,
    CampaignModalComponent,
    AdgroupModalComponent,
    DeleteAdgroupConfirmComponent,
    DeleteClientConfirmComponent
  ],
})
export class KeywordMatchingOptionsModule {}
