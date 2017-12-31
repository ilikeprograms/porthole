import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import {
  KeywordMatchingOptionsTabsComponent
} from './keyword-matching-options/keyword-matching-options-tabs/keyword-matching-options-tabs';

const appRoutes: Routes = [{
  path: 'keywords',
  component: KeywordMatchingOptionsTabsComponent
}, {
  path: 'about',
  component: AboutComponent
}, {
  path: '',
  redirectTo: 'keywords',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
