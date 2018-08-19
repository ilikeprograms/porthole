import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ClrDatagridComparatorInterface, ClrDatagridStringFilterInterface } from '@clr/angular';

import { takeUntil, map } from 'rxjs/operators';
import { combineLatest, Observable, of, Subject } from 'rxjs';

import { KeywordMatchingOptionsFacade } from '../../ngrx/keyword-matching-options.facade';
import { KeywordModifiers } from '../keyword-modifier-enum';
import { ICampaign } from '../../campaigns/campaign.interface';
import { IKeyword } from '../keyword.interface';
import { IAdgroup } from '../../adgroups/adgroup-interface';
import { KeywordExportService } from '../../keyword-export.service';


class KeywordNameComparator implements ClrDatagridComparatorInterface<IKeyword> {
  compare(a: IKeyword, b: IKeyword) {
    return ('' + a.text).localeCompare(b.text);
  }
}

class KeywordNameFilter implements ClrDatagridStringFilterInterface<IKeyword> {
  accepts(keyword: IKeyword, search: string): boolean {
    return keyword.text.indexOf(search) > -1;
  }
}

@Component({
  selector: 'app-keyword-list',
  templateUrl: './keyword-list.component.html',
})
export class KeywordListComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  public keywords$: Observable<Array<IKeyword>>;

  public pasteModal: boolean = false;

  public editKeyword: boolean | IKeyword = false;
  public addKeywordModal: boolean = false;

  public selected: any = [];

  @Input()
  public addgroup: IAdgroup;

  public campaign$: Observable<ICampaign>;

  public nameComparator: KeywordNameComparator = new KeywordNameComparator();
  public nameFilter = new KeywordNameFilter();

  constructor(
    private keywordMatchingOptionsFacade: KeywordMatchingOptionsFacade,
    private keywordExportService: KeywordExportService
  ) {}

  public ngOnInit(): void {
    this.campaign$ = combineLatest([this.keywordMatchingOptionsFacade.campaigns$, of(this.addgroup)]).pipe(
      takeUntil(this.unsubscribe$),
      map((values: [Array<ICampaign>, IAdgroup]) => {
        if (values[1]) {
          return values[0].filter((campaign: ICampaign) => {
            return campaign.id === values[1].campaignId;
          })[0];
        } else {
          return;
        }
      })
    );

    this.keywords$ = this.keywordMatchingOptionsFacade.getKeywordsForAdgroup(this.addgroup.id).pipe(
      takeUntil(this.unsubscribe$));
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public onDeleteKeywords(): void {
    const keywordIds: Array<string> = this.selected.map((keyword: IKeyword) => {
      return keyword.id;
    });

    this.keywordMatchingOptionsFacade.removeSelectedKeywords(keywordIds);

    this.selected = [];
  }

  public onDeleteAllKeywords(): void {
    this.keywordMatchingOptionsFacade.removeAllKeywords(this.addgroup.id);

    this.selected = [];
  }

  // public onNewKeywordMatchOptionChanged(modifier: KeywordModifiers): void {
  //   this.keywordMatchingOptionsFacade.changeNewKeywordOption(this.addgroup.id, modifier);
  // }

  public showAddKeywordModal(): void {
    this.addKeywordModal = true;
  }

  public showEditKeywordModal(keyword: IKeyword): void {
    this.editKeyword = { ...keyword as IKeyword };

    this.addKeywordModal = true;
  }

  public onAddKeyword(result: any) {
    if (result) {
      if (this.editKeyword) {
        const editKeyword: IKeyword = this.editKeyword as IKeyword;

        this.keywordMatchingOptionsFacade.editKeyword(editKeyword.id, result.keyword, result.modifier);
      } else {
        this.keywordMatchingOptionsFacade.addKeyword(this.addgroup.id, result.keyword, result.modifier);
      }
    }

    this.editKeyword = false;
    this.addKeywordModal = false;
  }

  public onCopyKeywords(): void {
    this.keywordMatchingOptionsFacade.copyKeywords(this.addgroup.id);
  }

  public onCopyNegativeKeywords(): void {
    this.keywordMatchingOptionsFacade.copyNegativeKeywords(this.addgroup.id);
  }

  public showPasteKeywordsModal(): void {
    this.pasteModal = true;
  }

  public onPasteKeywords(result: any) {
    if (result) {
      if (result.negative) {
        this.keywordMatchingOptionsFacade.pasteNegativeKeywords(this.addgroup.id, result.keywords);
      } else {
        this.keywordMatchingOptionsFacade.pasteKeywords(this.addgroup.id, result.keywords);
      }
    }

    this.pasteModal = false;
  }

  public onCsvExport(): void {
    this.keywordExportService.exportKeywords(this.keywords$);
  }
}
