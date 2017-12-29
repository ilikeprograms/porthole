import { Component, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { KeywordMatchingOptionsFacade } from '../ngrx/keyword-matching-options.facade';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { IClient } from '../client.interface';

@Component({
  selector: 'app-client-list',
  template: `
    <h1>Keywords matching options</h1>

    <app-tag-container *ngFor="let client of clients$ | async" [client]="client"></app-tag-container>
  `
})
export class ClientListComponent implements OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  public clients$: Observable<Array<IClient>>;

  constructor(
    private keywordMatchingOptionsFacade: KeywordMatchingOptionsFacade
  ) {
    this.clients$ = this.keywordMatchingOptionsFacade.clients.takeUntil(this.unsubscribe$);
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
