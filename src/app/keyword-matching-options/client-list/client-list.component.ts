import { Component, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { KeywordMatchingOptionsFacade } from '../ngrx/keyword-matching-options.facade';
import { IClient } from '../client.interface';

@Component({
  selector: 'app-client-list',
  template: `
    <h2>Keywords matching options</h2>

    <mat-tab-group>
      <mat-tab label="Ad Groups">
        <div class="tab-content">
          <app-tag-container *ngFor="let client of clients$ | async" [client]="client"></app-tag-container>
        </div>
      </mat-tab>
      <mat-tab label="Clients">
        <div class="tab-content">
          Clients
        </div>
      </mat-tab>
    </mat-tab-group>
  `,
  styles: [`
    .tab-content {
      padding: 1rem;
    }
  `]
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
