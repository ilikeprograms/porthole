import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { KeywordMatchingOptionsFacade } from '../../ngrx/keyword-matching-options.facade';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { KeywordModifiers } from '../../keyword-modifier-enum';
import { IAddGroupWithKeywords } from '../../addgroup-with-keywords.interface';
import { DeleteAllConfirmComponent } from '../delete-all-confirm/delete-all-confirm.component';
import { ICampaign } from '../../campaign.interface';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AdgroupModalComponent } from '../adgroup-modal/adgroup-modal.component';
import { DeleteAdgroupConfirmComponent } from '../delete-adgroup-confirm-modal/delete-addgroup-confirm-modal';

@Component({
  selector: 'app-keyword-list',
  templateUrl: './keyword-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', query('p app-keyword-card mat-card', style({ opacity: 0, transform: 'translateY(-50px)' }), { optional: true }),  {optional: true }),
        query(':enter', stagger('300ms', [
          query('p app-keyword-card mat-card',
            animate('300ms ease-in', style({ opacity: 1, transform: 'none', offset: 1 }))
          )
        ]), {optional: true }),
        query(':leave', stagger('300ms', [
          query('p app-keyword-card mat-card',
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
export class KeywordListComponent {
  @Input()
  public addgroupWithKeywords: IAddGroupWithKeywords;

  constructor(
    private keywordMatchingOptionsFacade: KeywordMatchingOptionsFacade,
    private dialog: MatDialog
  ) {}

  public onNewKeywordMatchOptionChanged(modifier: KeywordModifiers): void {
    this.keywordMatchingOptionsFacade.changeNewKeywordOption(this.addgroupWithKeywords.id, modifier);
  }

  public onAddKeyword(keywordText: string) {
    this.keywordMatchingOptionsFacade.addKeyword(this.addgroupWithKeywords.id, keywordText);
  }

  public onEditKeywordText({id, text}: { id: string; text: string; }): void {
    this.keywordMatchingOptionsFacade.editKeywordText(id, text);
  }

  public onRemoveKeyword(id: string): void {
    this.keywordMatchingOptionsFacade.removeKeyword(this.addgroupWithKeywords.id, id);
  }

  public onToggleKeywordSelected(id: string): void {
    this.keywordMatchingOptionsFacade.toggleKeywordSelected(id);
  }

  public onToggleAllSelected(): void {
    this.keywordMatchingOptionsFacade.toggleAllSelected(this.addgroupWithKeywords.id);
  }

  public onRemoveSelectedKeywords(): void {
    this.keywordMatchingOptionsFacade.removeSelectedKeywords(this.addgroupWithKeywords.id);
  }

  public onRemoveAllKeywords(): void {
    this.keywordMatchingOptionsFacade.removeAllKeywords(this.addgroupWithKeywords.id);
  }

  public onModifierChanged({ id, modifier}: { id: string; modifier: KeywordModifiers }): void {
    this.keywordMatchingOptionsFacade.editKeywordModifier(id, modifier);
  }

  public onCopyAllKeywords(): void {
    this.keywordMatchingOptionsFacade.copyAllKeywords(this.addgroupWithKeywords.id);
  }

  public onPasteKeywords(keywords: string) {
    this.keywordMatchingOptionsFacade.pasteKeywords(this.addgroupWithKeywords.id, keywords);
  }

  public editAdgroup(): void {
    let campaignsForAddModal: Array<ICampaign>;

    this.keywordMatchingOptionsFacade.campaigns$.take(1).subscribe((campaigns: Array<ICampaign>) => {
      campaignsForAddModal = campaigns;
    });

    // Open confirmation dialog, then remove all if yes is clicked
    const dialogRef: MatDialogRef<AdgroupModalComponent> = this.dialog.open(AdgroupModalComponent, {
      data: {
        adgroup: this.addgroupWithKeywords,
        campaigns: campaignsForAddModal
      }
    });

    dialogRef.afterClosed().take(1).subscribe(result => {
      if (result) {
        this.keywordMatchingOptionsFacade.addAdgroup(result.name, result.campaignId);
      }
    });
  }

  public onDeleteAdgroup(): void {
    // Open confirmation dialog, then remove all if yes is clicked
    const dialogRef: MatDialogRef<DeleteAdgroupConfirmComponent> = this.dialog.open(DeleteAdgroupConfirmComponent);

    dialogRef.afterClosed().take(1).subscribe(result => {
      if (result === true) {
        this.keywordMatchingOptionsFacade.deleteAdgroup(this.addgroupWithKeywords.id);
      }
    });
  }
}
