import { BrowserModule } from '@angular/platform-browser';
import { InjectionToken, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { META_REDUCERS, MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { MaterialImportsModule } from './material-imports.module';
import { KeywordMatchingOptionsModule } from './keyword-matching-options/keyword-matching-options.module';
import { SnackbarNgrxModule } from './snackbar-ngrx/snackbar-ngrx.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { stateToStorageMetareducer } from './core/state-to-storage.metareducer';
import { ChromeStorageService } from './core/chrome-storage.service';
import { environment } from '../environments/environment';
import { LicenceModule } from './licence/licence.module';

export const CHROME_STORAGE_SERVICE = new InjectionToken('CHROME_STORAGE_SERVICE');
export const STORAGE_KEY = new InjectionToken('STORAGE_KEY');

export function getChromeStorageService(chromeStorageService: ChromeStorageService, storageKey: string) {
  return stateToStorageMetareducer.bind(this, chromeStorageService, storageKey);
}

export function getMetaReducers(stateToStorageMetareducer): MetaReducer<any>[] {
  return [stateToStorageMetareducer];
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialImportsModule,
    CoreModule.forRoot(),
    AppRoutingModule,
    LicenceModule.forRoot(),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    KeywordMatchingOptionsModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    }),
    SnackbarNgrxModule
  ],
  providers: [
    {
      provide: STORAGE_KEY,
      useValue: environment.storageKey
    },
    {
      provide: CHROME_STORAGE_SERVICE,
      deps: [ChromeStorageService, STORAGE_KEY],
      useFactory: getChromeStorageService
    },
    {
      provide: META_REDUCERS,
      deps: [CHROME_STORAGE_SERVICE],
      useFactory: getMetaReducers
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
