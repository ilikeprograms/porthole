import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';

import { KeywordMatchingOptionsFacade } from '../../ngrx/keyword-matching-options.facade';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { KeywordModifiers } from '../../keywords/keyword-modifier-enum';
import { IAddGroupWithKeywords } from '../../addgroup-with-keywords.interface';
import { ICampaign } from '../../campaigns/campaign.interface';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AdgroupModalComponent } from '../adgroup-modal/adgroup-modal.component';
import { DeleteAdgroupConfirmComponent } from '../delete-adgroup-confirm-modal/delete-addgroup-confirm-modal';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-keyword-list',
  templateUrl: './keyword-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', query('p app-keyword-card .animation-wrapper', style({ opacity: 0, transform: 'translateY(-50px)' }), { optional: true }),  {optional: true }),
        query(':enter', stagger('300ms', [
          query('p app-keyword-card .animation-wrapper',
            animate('300ms ease-in', style({ opacity: 1, transform: 'none', offset: 1 }))
          )
        ]), {optional: true }),
        query(':leave', stagger('300ms', [
          query('p app-keyword-card .animation-wrapper',
            animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-50px)', offset: 1 }))
          )
        ]), {optional: true }),
      ])
    ]),
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
  public adgroup: IAddGroupWithKeywords;

  private unsubscribe$: Subject<void> = new Subject<void>();

  @Input()
  public addgroupWithKeywords: Observable<IAddGroupWithKeywords>;

  constructor(
    private keywordMatchingOptionsFacade: KeywordMatchingOptionsFacade,
    private dialog: MatDialog,
    private changeRef: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.addgroupWithKeywords.takeUntil(this.unsubscribe$).subscribe((adgroup: IAddGroupWithKeywords) => {
      this.adgroup = adgroup;

      this.changeRef.markForCheck();
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public onNewKeywordMatchOptionChanged(modifier: KeywordModifiers): void {
    this.keywordMatchingOptionsFacade.changeNewKeywordOption(this.adgroup.id, modifier);
  }

  public onAddKeyword(keywordText: string) {
    this.keywordMatchingOptionsFacade.addKeyword(this.adgroup.id, keywordText);
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
    this.keywordMatchingOptionsFacade.toggleAllSelected(this.adgroup.id);
  }

  public onRemoveSelectedKeywords(): void {
    this.keywordMatchingOptionsFacade.removeSelectedKeywords(this.adgroup.id);
  }

  public onRemoveAllKeywords(): void {
    this.keywordMatchingOptionsFacade.removeAllKeywords(this.adgroup.id);
  }

  public onModifierChanged({ id, modifier}: { id: string; modifier: KeywordModifiers }): void {
    this.keywordMatchingOptionsFacade.editKeywordModifier(id, modifier);
  }

  public onCopyAllKeywords(): void {
    this.keywordMatchingOptionsFacade.copyAllKeywords(this.adgroup.id);
  }

  public onPasteKeywords(keywords: string) {
    this.keywordMatchingOptionsFacade.pasteKeywords(this.adgroup.id, keywords);
  }

  public editAdgroup(): void {
    let campaignsForAddModal: Array<ICampaign>;

    this.keywordMatchingOptionsFacade.campaigns$.take(1).subscribe((campaigns: Array<ICampaign>) => {
      campaignsForAddModal = campaigns;
    });

    // Open confirmation dialog, then remove all if yes is clicked
    const dialogRef: MatDialogRef<AdgroupModalComponent> = this.dialog.open(AdgroupModalComponent, {
      data: {
        adgroup: this.adgroup,
        campaigns: campaignsForAddModal
      }
    });

    dialogRef.afterClosed().take(1).subscribe(result => {
      if (result) {
        this.keywordMatchingOptionsFacade.editAdgroup(this.adgroup.id, result.name, result.campaignId);
      }
    });
  }

  public onDeleteAdgroup(): void {
    // Open confirmation dialog, then remove all if yes is clicked
    const dialogRef: MatDialogRef<DeleteAdgroupConfirmComponent> = this.dialog.open(DeleteAdgroupConfirmComponent);

    dialogRef.afterClosed().take(1).subscribe(result => {
      if (result === true) {
        this.keywordMatchingOptionsFacade.deleteAdgroup(this.adgroup.id);
      }
    });
  }
}
