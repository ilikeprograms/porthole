import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { MaterialImportsModule } from './material-imports.module';
import { KeywordMatchingOptionsModule } from './keyword-matching-options/keyword-matching-options.module';
import { keywordMatchingOptionsReducer } from './keyword-matching-options/ngrx/keyword-matching-options-reducer';
import { KeywordMatchingOptionsDefaultState } from './keyword-matching-options/ngrx/keyword-matching-options-default.state';
import { SnackbarNgrxModule } from './snackbar-ngrx/snackbar-ngrx.module';
import { EffectsModule } from '@ngrx/effects';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialImportsModule,
    CoreModule.forRoot(),
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
    EffectsModule.forRoot([]),
    SnackbarNgrxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
