import { NgModule, Optional, SkipSelf } from '@angular/core';

import { NotificationsFacade } from './notifications.facade';
import { NotificationsEffects } from './ngrx/notifications.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    EffectsModule.forFeature([NotificationsEffects])
  ],
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
