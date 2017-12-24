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

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MaterialImportsModule,
  ],
  declarations: [
    TagContainerComponent,
    AddKeywordComponent,
    NoKeywordComponent,
    KeywordCardComponent,
    KeywordIconComponent,
    KeywordFooterActionsComponent
  ],
  exports: [
    TagContainerComponent,
  ],
  providers: [
    KeywordMatchingOptionsFacade
  ]
})
export class KeywordMatchingOptionsModule {}
