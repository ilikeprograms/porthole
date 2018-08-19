import { takeUntil, map } from 'rxjs/operators';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';

import { combineLatest, Observable, of, Subject } from 'rxjs';

import { KeywordMatchingOptionsFacade } from '../../ngrx/keyword-matching-options.facade';
import { KeywordModifiers } from '../keyword-modifier-enum';
import { ICampaign } from '../../campaigns/campaign.interface';
import { AdgroupModalComponent } from '../../adgroups/adgroup-modal/adgroup-modal.component';
import { DeleteAdgroupConfirmComponent } from '../../adgroups/delete-adgroup-confirm-modal/delete-addgroup-confirm-modal';
import { IKeyword } from '../keyword.interface';
import { IAdgroup } from '../../adgroups/adgroup-interface';
import { KeywordExportService } from '../../keyword-export.service';
import { IKey } from 'selenium-webdriver';
import { ClrDatagridComparatorInterface, ClrDatagridStringFilterInterface } from '@clr/angular';


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
  // changeDetection: ChangeDetectionStrategy.OnPush,
  // animations: [
  //   // trigger('listAnimation', [
  //   //   transition(':increment', [
  //   //     query('p app-keyword-card .animation-wrapper', style({ opacity: 0, transform: 'translateY(-50px)' }), { optional: true }),
  //   //     query('p app-keyword-card .animation-wrapper', stagger('300ms', [
  //   //       animate('300ms ease-in', style({ opacity: 1, transform: 'none', offset: 1 }))
  //   //     ]), {optional: true }),
  //   //   ]),
  //   //   transition(':decrement', [
  //   //     query('p app-keyword-card .animation-wrapper', stagger('300ms', [
  //   //       animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-50px)', offset: 1 }))
  //   //     ]), {optional: true })
  //   //   ])
  //   // ])
  // ],
  styles: [`
    /*.toolbar-actions {*/
      /*display: flex;*/
      /*flex: 1 1 auto;*/
    /*}*/
    
    /*.toolbar-actions-spacer {*/
      /*flex: 1 1 auto;*/
    /*}*/
    
    /*clr-dg-footer /deep/ .datagrid-foot-description {*/
      /*display: flex;*/
      /*flex-direction: row;*/
      /*align-content: space-between;*/
    /*}*/
    
    /*.data-grid-footer-left, .data-grid-footer-right {*/
      /*flex: 1 1 auto;*/
    /*}*/
    
    /*.data-grid-footer-left {*/
      /*text-align: left;*/
    /*}*/
    
    /*.data-grid-footer-right {*/
      /*text-align: right;*/
    /*}*/
  `]
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

  public onNewKeywordMatchOptionChanged(modifier: KeywordModifiers): void {
    this.keywordMatchingOptionsFacade.changeNewKeywordOption(this.addgroup.id, modifier);
  }

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

        this.keywordMatchingOptionsFacade.editKeywordText(editKeyword.id, result.keyword, result.modifier);
      } else {
        this.keywordMatchingOptionsFacade.addKeyword(this.addgroup.id, result.keyword, result.modifier);
      }
    }

    this.editKeyword = false;
    this.addKeywordModal = false;
  }

  // public onEditKeywordText({id, text}: { id: string; text: string; }): void {
  //   this.keywordMatchingOptionsFacade.editKeywordText(id, text);
  // }

  public onModifierChanged({ id, modifier}: { id: string; modifier: KeywordModifiers }): void {
    this.keywordMatchingOptionsFacade.editKeywordModifier(id, modifier);
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

  public onPasteNegativeKeywords(keywords: string) {
    this.keywordMatchingOptionsFacade.pasteNegativeKeywords(this.addgroup.id, keywords);
  }

  public onCsvExport(): void {
    this.keywordExportService.exportKeywords(this.keywords$);
  }

  public editAdgroup(): void {
    // let campaignsForAddModal: Array<ICampaign>;
    // let adgroupForAddModal: IAdgroup;
    //
    // this.keywordMatchingOptionsFacade.campaigns$.pipe(take(1)).subscribe((campaigns: Array<ICampaign>) => {
    //   campaignsForAddModal = campaigns;
    // });
    //
    // this.addgroup$.pipe(take(1)).subscribe((adgroup: IAdgroup) => {
    //   adgroupForAddModal = adgroup;
    // });
    //
    // // Open confirmation dialog, then remove all if yes is clicked
    // const dialogRef: MatDialogRef<AdgroupModalComponent> = this.dialog.open(AdgroupModalComponent, {
    //   data: {
    //     adgroup: adgroupForAddModal,
    //     campaigns: campaignsForAddModal
    //   }
    // });
    //
    // dialogRef.afterClosed().take(1).subscribe(result => {
    //   if (result) {
    //     this.keywordMatchingOptionsFacade.editAdgroup(this.addgroupId, result.name, result.campaignId);
    //   }
    // });
  }

  public onDeleteAdgroup(): void {
    // // Open confirmation dialog, then remove all if yes is clicked
    // const dialogRef: MatDialogRef<DeleteAdgroupConfirmComponent> = this.dialog.open(DeleteAdgroupConfirmComponent);
    //
    // dialogRef.afterClosed().take(1).subscribe(result => {
    //   if (result === true) {
    //     this.keywordMatchingOptionsFacade.deleteAdgroup(this.addgroupId);
    //   }
    // });
  }
}
