import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KeywordMatchingOptionsTabsComponent } from './keyword-matching-options/keyword-matching-options-tabs/keyword-matching-options-tabs';

const appRoutes: Routes = [{
  path: 'keywords',
  component: KeywordMatchingOptionsTabsComponent
}, {
  path: '',
  redirectTo: 'keywords',
  pathMatch: 'full'
}, {
  path: 'about',
  loadChildren: './about/about.module#AboutModule'
}];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
