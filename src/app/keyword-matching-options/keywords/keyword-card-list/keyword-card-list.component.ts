import { Component, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { KeywordMatchingOptionsFacade } from '../../ngrx/keyword-matching-options.facade';
import { IAddGroupWithKeywords } from '../../addgroup-with-keywords.interface';

@Component({
  selector: 'app-keyword-card-list',
  template: `
    <app-keyword-list *ngFor="let addgroup of addgroupsWithKeywords$ | async" [addgroupWithKeywords]="addgroup"></app-keyword-list>
  `
})
export class KeywordCardListComponent implements OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  public addgroupsWithKeywords$: Observable<Array<IAddGroupWithKeywords>>;

  constructor(
    private keywordMatchingOptionsFacade: KeywordMatchingOptionsFacade
  ) {
    this.addgroupsWithKeywords$ = this.keywordMatchingOptionsFacade.addgroupsWithKeywords$.takeUntil(this.unsubscribe$);
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
