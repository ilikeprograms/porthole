import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';

import { IKeyword } from '../keyword.interface';
import { KeywordMatchingOptionsFacade } from '../ngrx/keyword-matching-options.facade';

@Component({
  selector: 'app-tag-container',
  templateUrl: './tag-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagContainerComponent implements OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  public keywordsCount: Observable<number>;
  public keywords: Observable<Array<IKeyword>>;

  constructor(
    private keywordMatchingOptionsFacade: KeywordMatchingOptionsFacade
  ) {
    this.keywords = this.keywordMatchingOptionsFacade.keywords.pipe(takeUntil(this.unsubscribe$));
    this.keywordsCount = this.keywordMatchingOptionsFacade.keywordsCount.pipe(takeUntil(this.unsubscribe$));
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
