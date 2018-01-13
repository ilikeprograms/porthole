import { ActionReducer } from '@ngrx/store';

import { ChromeStorageService } from './chrome-storage.service';

export function stateToStorageMetareducer(chromeStorageService: ChromeStorageService, storageKey: string, reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    const nextState = reducer(state, action);

    if (chromeStorageService.initialised) {
      chromeStorageService.sync.set({[storageKey]: nextState});
    }

    return nextState;
  };
}
