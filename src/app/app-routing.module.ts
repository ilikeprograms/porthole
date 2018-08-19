import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CheckingLicenceComponent } from './licence/checking-licence/checking-licence.component';
import { LicenceValidGuard } from './licence/licence-valid.guard';

const appRoutes: Routes = [{
  path: 'licence',
  component: CheckingLicenceComponent
}, {
  path: 'keywords',
  loadChildren: './keyword-matching-options/keyword-matching-options.module#KeywordMatchingOptionsModule',
  canActivateChild: [LicenceValidGuard]
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
