import { Component, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/take';

import { KeywordMatchingOptionsFacade } from '../../ngrx/keyword-matching-options.facade';
import { IAddGroupWithKeywords } from '../../addgroup-with-keywords.interface';
import { AdgroupModalComponent } from '../adgroup-modal/adgroup-modal.component';
import { ICampaign } from '../../campaigns/campaign.interface';

@Component({
  selector: 'app-keyword-card-list',
  template: `
    <mat-card>
      <mat-card-content>
        <p>AdGroups and keywords can be added so there is an easier way to group, change, and manage keywords for AdWords.</p>
        <p>When copy is clicked all keywords are formatted with modifiers and copied to clipboard in an AdWords friendly format.<br />
          Keywords can be copied straight from AdWords and modifiers will be maintained. So just simply copy and paste from AdWords, once happy, press copy and paste back in.
        </p>
        <p *ngIf="(addgroupIds$| async).length === 0">No AdGroups, add one using the button below and you can then start managing keywords.</p>
      </mat-card-content>
    </mat-card>
    <app-keyword-list *ngFor="let adgroupId of addgroupIds$ | async" [addgroupId]="adgroupId"></app-keyword-list>
    <button mat-button color="primary" (click)="onAddAdgroup()">Add AdGroup</button>
  `
})
export class KeywordCardListComponent implements OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  public addgroupIds$: Observable<Array<string>>;

  constructor(
    private keywordMatchingOptionsFacade: KeywordMatchingOptionsFacade,
    private dialog: MatDialog
  ) {
    this.addgroupIds$ = this.keywordMatchingOptionsFacade.addgroupIds$.takeUntil(this.unsubscribe$);
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
