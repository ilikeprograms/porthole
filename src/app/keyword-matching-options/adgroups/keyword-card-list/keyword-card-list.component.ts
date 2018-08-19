import { takeUntil } from 'rxjs/operators';
import { Component, OnDestroy } from '@angular/core';

import { Observable ,  Subject } from 'rxjs';


import { KeywordMatchingOptionsFacade } from '../../ngrx/keyword-matching-options.facade';
import { IAdgroup } from '../adgroup-interface';

@Component({
  selector: 'app-keyword-card-list',
  template: `    
    <div class="card">
      <div class="card-block">
        <p>AdGroups and keywords can be added so there is an easier way to group, change, and manage keywords for AdWords.</p>
        <p>When copy is clicked all keywords are formatted with modifiers and copied to clipboard in an AdWords friendly format.<br />
        Keywords can be copied straight from AdWords and modifiers will be maintained. So just simply copy and paste from AdWords, once happy, press copy and paste back in.
        </p>

        <p *ngIf="(addgroups$ | async).length === 0">No AdGroups, add one using the button below and you can then start managing keywords.</p>
      </div>
    </div>

    <button class="btn btn-link" (click)="showAdgroupModal()">Add AdGroup</button>

    <app-adgroup-modal [modalOpen]="addAdgroupModal" [editModal]="editAdgroup" (modalClosed)="onAddAdgroup($event)"></app-adgroup-modal>
    <app-delete-adgroup-confirm-modal [modalOpen]="deleteAdgroupModal" (modalClosed)="onDeleteAdgroup($event)"></app-delete-adgroup-confirm-modal>


    <div class="card" *ngFor="let adgroup of addgroups$ | async">
        <app-keyword-list [addgroup]="adgroup"></app-keyword-list>
      
        <div class="card-footer">
          <button class="btn btn-primary" (click)="showEditAdgroupModal(adgroup)">Edit adgroup</button>
          <button class="btn btn-danger" (click)="showDeleteAdgroupModal(adgroup.id)">Delete adgroup</button>
        </div>
    </div>
  `
})
export class KeywordCardListComponent implements OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  public addgroups$: Observable<Array<IAdgroup>>;

  public addAdgroupModal: boolean = false;
  public editAdgroup: boolean | IAdgroup = false;
  public deleteAdgroupModal: boolean = false;
  public adgroupToDelete: string;

  constructor(
    private keywordMatchingOptionsFacade: KeywordMatchingOptionsFacade
  ) {
    this.addgroups$ = this.keywordMatchingOptionsFacade.addgroups$.pipe(takeUntil(this.unsubscribe$));
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public showAdgroupModal(): void {
    this.addAdgroupModal = true;
  }

  public showEditAdgroupModal(adgroup): void {
    this.editAdgroup = { ...adgroup as IAdgroup };

    this.addAdgroupModal = true;
  }

  public onAddAdgroup(result: any): void {
    if (result) {
      if (this.editAdgroup) {
        const editAdgroup: IAdgroup = this.editAdgroup as IAdgroup;

        this.keywordMatchingOptionsFacade.editAdgroup(editAdgroup.id, result.name, result.campaignId);
      } else {
        this.keywordMatchingOptionsFacade.addAdgroup(result.name, result.campaignId);
      }
    }

    this.editAdgroup = false;
    this.addAdgroupModal = false;
  }

  public showDeleteAdgroupModal(adgroupId: string): void {
    this.adgroupToDelete = adgroupId;

    this.deleteAdgroupModal = true;
  }

  public onDeleteAdgroup(result): void {
    if (result) {
      this.keywordMatchingOptionsFacade.deleteAdgroup(this.adgroupToDelete);
    }

    this.deleteAdgroupModal = false;
  }
}
