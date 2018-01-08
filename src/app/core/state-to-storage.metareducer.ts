import { ActionReducer } from '@ngrx/store';
import { ChromeStorageService } from './chrome-storage.service';

export function stateToStorageMetareducer(chromeStorageService: ChromeStorageService, reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    const nextState = reducer(state, action);

    chromeStorageService.sync.set({'appstate': nextState});

    chromeStorageService.sync.get('appstate', (data) => {
      console.log(data);
    });

    return nextState;
    //
    //
    // console.log(chrome.storage.get('appstate'));
    // chrome.storage.sync('appstate', nextState);
    //
    // return nextState;
  };
}
