import { BrowserModule } from '@angular/platform-browser';
import { InjectionToken, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { META_REDUCERS, MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ClarityModule } from '@clr/angular';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { stateToStorageMetareducer } from './core/state-to-storage.metareducer';
import { ChromeStorageService } from './core/chrome-storage.service';
import { environment } from '../environments/environment';
import { LicenceModule } from './licence/licence.module';
import { notificationsReducer } from './notifications/ngrx/notifications.reducer';
import { NotificationsModule } from './notifications/notifications.module';

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

    ClarityModule,

    CoreModule.forRoot(),
    AppRoutingModule,
    LicenceModule.forRoot(),
    StoreModule.forRoot({
      notifications: notificationsReducer
    }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    }),
    NotificationsModule
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
