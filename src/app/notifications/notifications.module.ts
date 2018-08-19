import { NgModule, Optional, SkipSelf } from '@angular/core';

import { NotificationsFacade } from './notifications.facade';

@NgModule({
  imports: [],
  providers: [
    NotificationsFacade
  ]
})
export class NotificationsModule {
  constructor(
    @Optional()
    @SkipSelf()
      parentModule: NotificationsModule
  ) {
    if (parentModule) {
      throw new Error('NotificationsModule is already loaded. Import only in AppModule');
    }
  }
}
