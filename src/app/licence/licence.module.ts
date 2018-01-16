import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CheckingLicenceComponent } from './checking-licence/checking-licence.component';
import { LicenceService } from './licence.service';
import { CoreModule } from '../core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialImportsModule } from '../material-imports.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialImportsModule
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
    public parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('LicenceModule is already loaded. Import only in AppModule');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LicenceModule,
      providers: [
        LicenceService
      ]
    };
  }
}
