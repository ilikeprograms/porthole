import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';

import { IKeyword } from '../../keyword.interface';
import { KeywordMatchingOptionsFacade } from '../../ngrx/keyword-matching-options.facade';
import { animate, keyframes, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { IClient } from '../../client.interface';
import { KeywordModifiers } from '../../keyword-modifier-enum';

@Component({
  selector: 'app-keyword-list',
  templateUrl: './keyword-list.component.html',
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
export class KeywordListComponent implements OnDestroy, OnInit {
  private unsubscribe$: Subject<void> = new Subject<void>();

  @Input()
  public client: IClient;

  public keywordsCount$: Observable<number>;
  public keywordsSelectedCount$: Observable<number>;
  public keywordsAllSelected$: Observable<boolean>;
  public keywords$: Observable<Array<IKeyword>>;

  constructor(
    private keywordMatchingOptionsFacade: KeywordMatchingOptionsFacade
  ) {}

  public ngOnInit(): void {
    this.keywords$ = this.keywordMatchingOptionsFacade.keywordsByClientId(this.client.id).pipe(takeUntil(this.unsubscribe$));

    this.keywordsCount$ = this.keywordMatchingOptionsFacade.keywordsByClientIdCount(this.client.id).pipe(takeUntil(this.unsubscribe$));
    this.keywordsSelectedCount$ = this.keywordMatchingOptionsFacade.keywordsByClientIdSelected(this.client.id).pipe(takeUntil(this.unsubscribe$));
    this.keywordsAllSelected$ = this.keywordMatchingOptionsFacade.keywordsByClientIdAllSelected(this.client.id).pipe(takeUntil(this.unsubscribe$));
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public onNewKeywordMatchOptionChanged(modifier: KeywordModifiers): void {
    this.keywordMatchingOptionsFacade.changeNewKeywordOption(this.client.id, modifier);
  }

  public onAddKeyword(keywordText: string) {
    this.keywordMatchingOptionsFacade.addKeyword(this.client.id, keywordText);
  }

  public onEditKeywordText({id, text}: { id: string; text: string; }): void {
    this.keywordMatchingOptionsFacade.editKeywordText(id, text);
  }

  public onRemoveKeyword(id: string): void {
    this.keywordMatchingOptionsFacade.removeKeyword(id);
  }

  public onToggleKeywordSelected(id: string): void {
    this.keywordMatchingOptionsFacade.toggleKeywordSelected(id);
  }

  public onToggleAllSelected(): void {
    this.keywordMatchingOptionsFacade.toggleAllSelected(this.client.id);
  }

  public onRemoveSelectedKeywords(): void {
    this.keywordMatchingOptionsFacade.removeSelectedKeywords(this.client.id);
  }

  public onRemoveAllKeywords(): void {
    this.keywordMatchingOptionsFacade.removeAllKeywords(this.client.id);
  }

  public onModifierChanged({ id, modifier}: { id: string; modifier: KeywordModifiers }): void {
    this.keywordMatchingOptionsFacade.editKeywordModifier(id, modifier);
  }

  public onCopyAllKeywords(): void {
    this.keywordMatchingOptionsFacade.copyAllKeywords(this.client.id);
  }

  public onPasteKeywords(keywords: string) {
    this.keywordMatchingOptionsFacade.pasteKeywords(this.client.id, keywords);
  }
}
