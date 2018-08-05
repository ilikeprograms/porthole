import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { KeywordMatchingOptionsTabsComponent } from './keyword-matching-options-tabs/keyword-matching-options-tabs';

const routes: Routes = [{
  path: '',
  component: KeywordMatchingOptionsTabsComponent
}];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
