import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { CheckingLicenceComponent } from './checking-licence/checking-licence.component';
import { LicenceService } from './licence.service';
import { LicenceValidGuard } from './licence-valid.guard';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    CheckingLicenceComponent
  ],
  exports: [
    CheckingLicenceComponent
  ]
})
export class LicenceModule {
  constructor(
    @Optional()
    @SkipSelf()
    public parentModule: LicenceModule
  ) {
    if (parentModule) {
      throw new Error('LicenceModule is already loaded. Import only in AppModule');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LicenceModule,
      providers: [
        LicenceService,
        LicenceValidGuard
      ]
    };
  }
}
