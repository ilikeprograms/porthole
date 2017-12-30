import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientListComponent } from './keyword-matching-options/client-list/client-list.component';
import { AboutComponent } from './about/about.component';

const appRoutes: Routes = [{
  path: 'keywords',
  component: ClientListComponent
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
