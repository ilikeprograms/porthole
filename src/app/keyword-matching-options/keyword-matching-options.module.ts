import { NgModule } from '@angular/core';

import { MaterialImportsModule } from '../material-imports.module';
import { TagContainerComponent } from './tag-container/tag-container.component';
import { CommonModule } from '@angular/common';
import { KeywordIconComponent } from './keyword-icon/keyword-icon.component';
import { KeywordMatchingOptionsFacade } from './ngrx/keyword-matching-options.facade';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MaterialImportsModule,
  ],
  declarations: [
    TagContainerComponent,
    KeywordIconComponent
  ],
  exports: [
    TagContainerComponent,
  ],
  providers: [
    KeywordMatchingOptionsFacade
  ]
})
export class KeywordMatchingOptionsModule {}
