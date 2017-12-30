import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { MaterialImportsModule } from './material-imports.module';
import { KeywordMatchingOptionsModule } from './keyword-matching-options/keyword-matching-options.module';
import { keywordMatchingOptionsReducer } from './keyword-matching-options/ngrx/keyword-matching-options-reducer';
import { KeywordMatchingOptionsDefaultState } from './keyword-matching-options/ngrx/keyword-matching-options-default.state';
import { SnackbarNgrxModule } from './snackbar-ngrx/snackbar-ngrx.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AboutModule } from './about/about.module';

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
    StoreModule.forRoot({
      keywordMatchingOptions: keywordMatchingOptionsReducer
    }, {
      initialState: {
        keywordMatchingOptions: KeywordMatchingOptionsDefaultState
      }
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    }),
    KeywordMatchingOptionsModule,
    AboutModule,
    EffectsModule.forRoot([]),
    SnackbarNgrxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
