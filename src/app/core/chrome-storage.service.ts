import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import SyncStorageArea = chrome.storage.SyncStorageArea;

import {} from '@types/chrome';

interface IMockSync {
  get: (keys: string | string[] | Object | null, callback: (items: { [key: string]: any }) => void) => void;
  set: ((items: Object, callback?: () => void) => void);
}

let syncStore = {};

const mockSync: IMockSync = {
  get: (key: string, callback) => {
    callback({
      [key]: syncStore[key]
    });
  },
  set: (syncData: object) => {
    syncStore = Object.assign({}, syncData);
  }
};

@Injectable()
export class ChromeStorageService {
  public sync: SyncStorageArea | IMockSync;
  public initialised: boolean = false;

  constructor() {
    this.sync = environment.production ? chrome.storage.sync : mockSync;
  }
}
