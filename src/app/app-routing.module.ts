import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KeywordMatchingOptionsTabsComponent } from './keyword-matching-options/keyword-matching-options-tabs/keyword-matching-options-tabs';
import { CheckingLicenceComponent } from './licence/checking-licence/checking-licence.component';

const appRoutes: Routes = [{
  path: 'licence',
  component: CheckingLicenceComponent
}, {
    path: 'keywords',
    component: KeywordMatchingOptionsTabsComponent
}, {
  path: 'about',
  loadChildren: './about/about.module#AboutModule'
}, {
  path: '',
  redirectTo: 'licence',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
