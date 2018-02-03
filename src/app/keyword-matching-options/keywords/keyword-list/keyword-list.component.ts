import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/combineLatest';

import { KeywordMatchingOptionsFacade } from '../../ngrx/keyword-matching-options.facade';
import { KeywordModifiers } from '../keyword-modifier-enum';
import { ICampaign } from '../../campaigns/campaign.interface';
import { AdgroupModalComponent } from '../../adgroups/adgroup-modal/adgroup-modal.component';
import { DeleteAdgroupConfirmComponent } from '../../adgroups/delete-adgroup-confirm-modal/delete-addgroup-confirm-modal';
import { IKeyword } from '../keyword.interface';
import { IAdgroup } from '../../adgroups/adgroup-interface';
import { KeywordExportService } from '../../keyword-export.service';

@Component({
  selector: 'app-keyword-list',
  templateUrl: './keyword-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    // trigger('listAnimation', [
    //   transition(':increment', [
    //     query('p app-keyword-card .animation-wrapper', style({ opacity: 0, transform: 'translateY(-50px)' }), { optional: true }),
    //     query('p app-keyword-card .animation-wrapper', stagger('300ms', [
    //       animate('300ms ease-in', style({ opacity: 1, transform: 'none', offset: 1 }))
    //     ]), {optional: true }),
    //   ]),
    //   transition(':decrement', [
    //     query('p app-keyword-card .animation-wrapper', stagger('300ms', [
    //       animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-50px)', offset: 1 }))
    //     ]), {optional: true })
    //   ])
    // ])
  ],
  styles: [`
    .toolbar-actions {
      display: flex;
      flex: 1 1 auto;
    }

    .toolbar-actions-spacer {
      flex: 1 1 auto;
    }
  `]
})
export class KeywordListComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  public keywords$: Observable<Array<IKeyword>>;
  public keywordsSelectedCount$: Observable<number>;
  public keywordsAllSelected$: Observable<boolean>;

  @Input()
  public addgroupId: string;

  public addgroup$: Observable<IAdgroup>;
  public campaign$: Observable<ICampaign>;

  constructor(
    private keywordMatchingOptionsFacade: KeywordMatchingOptionsFacade,
    private keywordExportService: KeywordExportService,
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.addgroup$ = this.keywordMatchingOptionsFacade.getAdgroupById(this.addgroupId)
      .takeUntil(this.unsubscribe$);

    this.campaign$ = Observable.combineLatest(this.keywordMatchingOptionsFacade.campaigns$, this.addgroup$)
      .map((values: [Array<ICampaign>, IAdgroup]) => {
        if (values[1]) {
          return values[0].filter((campaign: ICampaign) => {
            return campaign.id === values[1].campaignId;
          })[0];
        } else {
          return;
        }
      }).takeUntil(this.unsubscribe$);

    this.keywords$ = this.keywordMatchingOptionsFacade.getKeywordsForAdgroup(this.addgroupId)
      .takeUntil(this.unsubscribe$);

    this.keywordsSelectedCount$ = this.keywordMatchingOptionsFacade.getSelectedKeywordsCountForAdgroup(this.addgroupId)
      .takeUntil(this.unsubscribe$);

    this.keywordsAllSelected$ = this.keywordMatchingOptionsFacade.getKeywordsAllSelectedForAdgroup(this.addgroupId)
      .takeUntil(this.unsubscribe$);
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public onNewKeywordMatchOptionChanged(modifier: KeywordModifiers): void {
    this.keywordMatchingOptionsFacade.changeNewKeywordOption(this.addgroupId, modifier);
  }

  public onAddKeyword(keywordText: string) {
    this.keywordMatchingOptionsFacade.addKeyword(this.addgroupId, keywordText);
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
    this.keywordMatchingOptionsFacade.toggleAllSelected(this.addgroupId);
  }

  public onRemoveSelectedKeywords(): void {
    this.keywordMatchingOptionsFacade.removeSelectedKeywords(this.addgroupId);
  }

  public onRemoveAllKeywords(): void {
    this.keywordMatchingOptionsFacade.removeAllKeywords(this.addgroupId);
  }

  public onModifierChanged({ id, modifier}: { id: string; modifier: KeywordModifiers }): void {
    this.keywordMatchingOptionsFacade.editKeywordModifier(id, modifier);
  }

  public onCopyKeywords(): void {
    this.keywordMatchingOptionsFacade.copyKeywords(this.addgroupId);
  }

  public onCopyNegativeKeywords(): void {
    this.keywordMatchingOptionsFacade.copyNegativeKeywords(this.addgroupId);
  }

  public onPasteKeywords(keywords: string) {
    this.keywordMatchingOptionsFacade.pasteKeywords(this.addgroupId, keywords);
  }

  public onPasteNegativeKeywords(keywords: string) {
    this.keywordMatchingOptionsFacade.pasteNegativeKeywords(this.addgroupId, keywords);
  }

  public onCsvExport(): void {
    this.keywordExportService.exportKeywords(this.keywords$);
  }

  public editAdgroup(): void {
    let campaignsForAddModal: Array<ICampaign>;
    let adgroupForAddModal: IAdgroup;

    this.keywordMatchingOptionsFacade.campaigns$.take(1).subscribe((campaigns: Array<ICampaign>) => {
      campaignsForAddModal = campaigns;
    });

    this.addgroup$.take(1).subscribe((adgroup: IAdgroup) => {
      adgroupForAddModal = adgroup;
    });

    // Open confirmation dialog, then remove all if yes is clicked
    const dialogRef: MatDialogRef<AdgroupModalComponent> = this.dialog.open(AdgroupModalComponent, {
      data: {
        adgroup: adgroupForAddModal,
        campaigns: campaignsForAddModal
      }
    });

    dialogRef.afterClosed().take(1).subscribe(result => {
      if (result) {
        this.keywordMatchingOptionsFacade.editAdgroup(this.addgroupId, result.name, result.campaignId);
      }
    });
  }

  public onDeleteAdgroup(): void {
    // Open confirmation dialog, then remove all if yes is clicked
    const dialogRef: MatDialogRef<DeleteAdgroupConfirmComponent> = this.dialog.open(DeleteAdgroupConfirmComponent);

    dialogRef.afterClosed().take(1).subscribe(result => {
      if (result === true) {
        this.keywordMatchingOptionsFacade.deleteAdgroup(this.addgroupId);
      }
    });
  }
}
