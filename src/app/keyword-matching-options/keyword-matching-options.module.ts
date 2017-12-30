import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialImportsModule } from '../material-imports.module';
import { KeywordListComponent } from './keywords/keyword-list/keyword-list.component';
import { KeywordIconComponent } from './keywords/keyword-icon/keyword-icon.component';
import { KeywordMatchingOptionsFacade } from './ngrx/keyword-matching-options.facade';
import { KeywordFooterActionsComponent } from './keywords/keyword-footer-actions/keyword-footer-actions.component';
import { AddKeywordComponent } from './keywords/add-keyword/add-keyword.component';
import { KeywordCardComponent } from './keywords/keyword-card/keyword-card.component';
import { NoKeywordComponent } from './keywords/no-keyword/no-keyword.component';
import { DeleteAllConfirmComponent } from './keywords/delete-all-confirm/delete-all-confirm.component';
import { EffectsModule } from '@ngrx/effects';
import { KeywordMatchingOptionsEffects } from './ngrx/keyword-matching-options.effects';
import { PasteModalComponent } from './keywords/paste-modal/paste-modal.component';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { KeywordMatchingOptionsTabsComponent } from './keyword-matching-options-tabs';
import { ClientAddModalComponent } from './clients/client-add-modal/client-add-modal.component';
import { CampaignDeleteModalComponent } from './clients/campaign-delete-modal/campaign-delete-modal';
import { CampaignModalComponent } from './clients/campaign-modal/campaign-modal.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MaterialImportsModule,
    EffectsModule.forFeature([KeywordMatchingOptionsEffects])
  ],
  declarations: [
    KeywordMatchingOptionsTabsComponent,
    KeywordListComponent,
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
    CampaignModalComponent
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
    CampaignModalComponent
  ],
})
export class KeywordMatchingOptionsModule {}
