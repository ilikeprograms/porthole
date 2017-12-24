import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MaterialImportsModule } from './material-imports.module';
import { KeywordMatchingOptionsModule } from './keyword-matching-options/keyword-matching-options.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { keywordMatchingOptionsReducer } from './keyword-matching-options/ngrx/keyword-matching-options-reducer';
import { KeywordMatchingOptionsDefaultState } from './keyword-matching-options/ngrx/keyword-matching-options-default.state';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialImportsModule,
    KeywordMatchingOptionsModule,
    StoreModule.forRoot({
      keywordMatchingOptions: keywordMatchingOptionsReducer
    }, {
      initialState: {
        keywordMatchingOptions: KeywordMatchingOptionsDefaultState
      }
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
