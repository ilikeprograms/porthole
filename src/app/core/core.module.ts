import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { ClipboardService } from './clipboard.service';

@NgModule({

})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
      public parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        ClipboardService
      ]
    };
  }
}
