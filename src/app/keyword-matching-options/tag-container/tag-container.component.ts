import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';

import { IKeyword } from '../keyword.interface';
import { KeywordMatchingOptionsFacade } from '../ngrx/keyword-matching-options.facade';
import { animate, keyframes, query, stagger, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-tag-container',
  templateUrl: './tag-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', query('app-keyword-card mat-card', style({ opacity: 0, transform: 'translateY(-50px)' }), { optional: true }),  {optional: true }),
        query(':enter', stagger('300ms', [
          query('app-keyword-card mat-card',
            animate('300ms ease-in', style({ opacity: 1, transform: 'none', offset: 1 }))
          )
        ]), {optional: true }),
        query(':leave', stagger('300ms', [
          query('app-keyword-card mat-card',
            animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-50px)', offset: 1 }))
          )
        ]), {optional: true }),
      ])
    ]),
  ]
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
