import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SnackbarNgrxService } from './snackbar-ngrx.service';
import { SnackbarNgrxEffects } from './ngrx/snackbar-ngrx.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    EffectsModule.forFeature([SnackbarNgrxEffects])
  ],
  providers: [
    SnackbarNgrxService
  ]
})
export class SnackbarNgrxModule {
  constructor(
    @Optional()
    @SkipSelf()
      parentModule: SnackbarNgrxModule
  ) {
    if (parentModule) {
      throw new Error('SnackbarNgrxModule is already loaded. Import only in AppModule');
    }
  }
}
