import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialImportsModule } from '../material-imports.module';
import { TagContainerComponent } from './tag-container/tag-container.component';
import { KeywordIconComponent } from './keyword-icon/keyword-icon.component';
import { KeywordMatchingOptionsFacade } from './ngrx/keyword-matching-options.facade';
import { KeywordFooterActionsComponent } from './keyword-footer-actions/keyword-footer-actions.component';
import { AddKeywordComponent } from './add-keyword/add-keyword.component';
import { KeywordCardComponent } from './keyword-card/keyword-card.component';
import { NoKeywordComponent } from './no-keyword/no-keyword.component';
import { DeleteAllConfirmComponent } from './delete-all-confirm/delete-all-confirm.component';
import { EffectsModule } from '@ngrx/effects';
import { KeywordMatchingOptionsEffects } from './ngrx/keyword-matching-options.effects';
import { PasteModalComponent } from './paste-modal/paste-modal.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MaterialImportsModule,
    EffectsModule.forFeature([KeywordMatchingOptionsEffects])
  ],
  declarations: [
    TagContainerComponent,
    AddKeywordComponent,
    NoKeywordComponent,
    KeywordCardComponent,
    KeywordIconComponent,
    KeywordFooterActionsComponent,
    DeleteAllConfirmComponent,
    PasteModalComponent
  ],
  exports: [
    TagContainerComponent,
  ],
  providers: [
    KeywordMatchingOptionsFacade
  ],
  entryComponents: [
    DeleteAllConfirmComponent,
    PasteModalComponent
  ],
})
export class KeywordMatchingOptionsModule {}
