import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { ClarityModule, ClrFormsNextModule } from '@clr/angular';

import { KeywordListComponent } from './keywords/keyword-list/keyword-list.component';
import { KeywordMatchingOptionsFacade } from './ngrx/keyword-matching-options.facade';
import { AddKeywordComponent } from './keywords/add-keyword/add-keyword.component';
import { KeywordMatchingOptionsEffects } from './ngrx/keyword-matching-options.effects';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { KeywordMatchingOptionsTabsComponent } from './keyword-matching-options-tabs/keyword-matching-options-tabs';
import { ClientAddModalComponent } from './clients/client-add-modal/client-add-modal.component';
import { CampaignDeleteModalComponent } from './campaigns/campaign-delete-modal/campaign-delete-modal.component';
import { CampaignModalComponent } from './campaigns/campaign-modal/campaign-modal.component';
import { KeywordCardListComponent } from './adgroups/keyword-card-list/keyword-card-list.component';
import { AdgroupModalComponent } from './adgroups/adgroup-modal/adgroup-modal.component';
import { DeleteAdgroupConfirmComponent } from './adgroups/delete-adgroup-confirm-modal/delete-addgroup-confirm-modal';
import { DeleteClientConfirmComponent } from './clients/delete-client-confirm-modal/delete-client-confirm-modal';
import { clientsReducer } from './clients/ngrx/clients.reducer';
import { ClientsDefaultState } from './clients/ngrx/clients-default.state';
import { campaignsReducer } from './campaigns/ngrx/campaigns.reducer';
import { CampaignsDefaultState } from './campaigns/ngrx/campaigns-default.state';
import { adgroupReducer } from './adgroups/ngrx/adgroup.reducer';
import { AdgroupDefaultState } from './adgroups/ngrx/adgroup-default.state';
import { keywordsReducer } from './keywords/ngrx/keywords.reducer';
import { KeywordsDefaultState } from './keywords/ngrx/keywords-default.state';
import { routing } from './keyword-matching-options.routing';
import { KeywordExportService } from './keyword-export.service';
import { KeywordModifierPipe } from './keywords/keyword-modifier/keyword-modifier.pipe';
import { PasteKeywordsComponent } from './keywords/paste-keywords/paste-keywords.component';
import { ModifierFilterComponent } from './keywords/modifier-filter/modifier-filter.component';
import { ModifiersSelectComponent } from './keywords/modifiers-select/modifiers-select.component';
import { ActionBarButtonStackModule } from '../shared-components/action-bar-button-stack/action-bar-button-stack.module';
import { ChangeAdgroupModalComponent } from './keywords/change-adgroup-modal/change-adgroup-modal.component';
import { ChangeModifierModalComponent } from './keywords/change-modifier-modal/change-modifier-modal.component';

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
    routing,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ClarityModule,
    ClrFormsNextModule,
    ActionBarButtonStackModule,
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
    ClientAddModalComponent,
    CampaignDeleteModalComponent,
    CampaignModalComponent,
    AdgroupModalComponent,
    DeleteAdgroupConfirmComponent,
    DeleteClientConfirmComponent,
    PasteKeywordsComponent,
    ChangeAdgroupModalComponent,
    ChangeModifierModalComponent,

    ModifiersSelectComponent,
    ModifierFilterComponent,
    KeywordModifierPipe
  ],
  exports: [
    KeywordMatchingOptionsTabsComponent
  ],
  providers: [
    KeywordMatchingOptionsFacade,
    KeywordExportService,
    {
      provide: KEYWORD_MATCHING_OPTIONS_REDUCERS_TOKEN,
      useFactory: getReducers
    },
  ]
})
export class KeywordMatchingOptionsModule {}
