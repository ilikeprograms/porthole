import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';

import { MaterialImportsModule } from '../material-imports.module';
import { KeywordListComponent } from './adgroups/keyword-list/keyword-list.component';
import { KeywordIconComponent } from './adgroups/keyword-icon/keyword-icon.component';
import { KeywordMatchingOptionsFacade } from './ngrx/keyword-matching-options.facade';
import { KeywordFooterActionsComponent } from './adgroups/keyword-footer-actions/keyword-footer-actions.component';
import { AddKeywordComponent } from './adgroups/add-keyword/add-keyword.component';
import { KeywordCardComponent } from './adgroups/keyword-card/keyword-card.component';
import { NoKeywordComponent } from './adgroups/no-keyword/no-keyword.component';
import { DeleteAllConfirmComponent } from './adgroups/delete-all-confirm/delete-all-confirm.component';
import { KeywordMatchingOptionsEffects } from './ngrx/keyword-matching-options.effects';
import { PasteModalComponent } from './adgroups/paste-modal/paste-modal.component';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { KeywordMatchingOptionsTabsComponent } from './keyword-matching-options-tabs/keyword-matching-options-tabs';
import { ClientAddModalComponent } from './clients/client-add-modal/client-add-modal.component';
import { CampaignDeleteModalComponent } from './campaigns/campaign-delete-modal/campaign-delete-modal';
import { CampaignModalComponent } from './campaigns/campaign-modal/campaign-modal.component';
import { KeywordCardListComponent } from './adgroups/keyword-card-list/keyword-card-list.component';
import { AdgroupModalComponent } from './adgroups/adgroup-modal/adgroup-modal.component';
import { DeleteAdgroupConfirmComponent } from './adgroups/delete-adgroup-confirm-modal/delete-addgroup-confirm-modal';
import { DeleteClientConfirmComponent } from './clients/delete-client-confirm-modal/delete-client-confirm-modal';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { keywordMatchingOptionsReducer } from './ngrx/keyword-matching-options-reducer';
import { KeywordMatchingOptionsDefaultState } from './ngrx/keyword-matching-options-default.state';
import { clientsReducer } from './clients/ngrx/clients.reducer';
import { ClientsDefaultState } from './clients/ngrx/clients-default.state';
import { campaignsReducer } from './campaigns/ngrx/campaigns.reducer';
import { CampaignsDefaultState } from './campaigns/ngrx/campaigns-default.state';

export const reducers: ActionReducerMap<any> = {
  // keywordMatchingOptions: keywordMatchingOptionsReducer,
  clients: clientsReducer,
  campaigns: campaignsReducer
};

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MaterialImportsModule,
    StoreModule.forFeature('keywordMatchingOptions', reducers, {
      initialState: {
        // keywordMatchingOptions: KeywordMatchingOptionsDefaultState,
        clients: ClientsDefaultState,
        campaigns: CampaignsDefaultState
      }
    }),
    // EffectsModule.forFeature([KeywordMatchingOptionsEffects])
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
    KeywordMatchingOptionsFacade
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
