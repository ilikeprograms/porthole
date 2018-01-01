import { Component, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/take';

import { KeywordMatchingOptionsFacade } from '../../ngrx/keyword-matching-options.facade';
import { IAddGroupWithKeywords } from '../../addgroup-with-keywords.interface';
import { DeleteAllConfirmComponent } from '../delete-all-confirm/delete-all-confirm.component';
import { AdgroupModalComponent } from '../adgroup-modal/adgroup-modal.component';
import { ICampaign } from '../../campaign.interface';

@Component({
  selector: 'app-keyword-card-list',
  template: `
    <app-keyword-list *ngFor="let addgroup of addgroupsWithKeywords$ | async" [addgroupWithKeywords]="addgroup"></app-keyword-list>
    <button mat-button color="primary" (click)="onAddAdgroup()">Add AdGroup</button>
  `
})
export class KeywordCardListComponent implements OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  public addgroupsWithKeywords$: Observable<Array<IAddGroupWithKeywords>>;

  constructor(
    private keywordMatchingOptionsFacade: KeywordMatchingOptionsFacade,
    private dialog: MatDialog
  ) {
    this.addgroupsWithKeywords$ = this.keywordMatchingOptionsFacade.addgroupsWithKeywords$.takeUntil(this.unsubscribe$);
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public onAddAdgroup(): void {
    let campaignsForAddModal: Array<ICampaign>;

    this.keywordMatchingOptionsFacade.campaigns$.take(1).subscribe((campaigns: Array<ICampaign>) => {
      campaignsForAddModal = campaigns;
    });

    // Open confirmation dialog, then remove all if yes is clicked
    const dialogRef: MatDialogRef<AdgroupModalComponent> = this.dialog.open(AdgroupModalComponent, {
      data: {
        campaigns: campaignsForAddModal
      }
    });

    dialogRef.afterClosed().take(1).subscribe(result => {
      if (result) {
        this.keywordMatchingOptionsFacade.addAdgroup(result.name, result.campaignId);
      }
    });
  }
}
