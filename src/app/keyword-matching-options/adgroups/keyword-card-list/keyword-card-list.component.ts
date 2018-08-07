import { takeUntil } from 'rxjs/operators';
import { Component, OnDestroy } from '@angular/core';

import { Observable ,  Subject } from 'rxjs';


import { KeywordMatchingOptionsFacade } from '../../ngrx/keyword-matching-options.facade';

@Component({
  selector: 'app-keyword-card-list',
  template: `
    <div class="card">
      <div class="card-block">
        <p>AdGroups and keywords can be added so there is an easier way to group, change, and manage keywords for AdWords.</p>
        <p>When copy is clicked all keywords are formatted with modifiers and copied to clipboard in an AdWords friendly format.<br />
        Keywords can be copied straight from AdWords and modifiers will be maintained. So just simply copy and paste from AdWords, once happy, press copy and paste back in.
        </p>

        <p *ngIf="(addgroupIds$ | async).length === 0">No AdGroups, add one using the button below and you can then start managing keywords.</p>
      </div>
      
      <div class="card-block">
        <app-keyword-list *ngFor="let adgroupId of addgroupIds$ | async" [addgroupId]="adgroupId"></app-keyword-list>
      </div>
    </div>
    
    <button class="btn btn-primary" (click)="addAdgroupModal = true">Add AdGroup</button>

    <app-adgroup-modal [modalOpen]="addAdgroupModal" (modalClosed)="onAddAdgroup($event)"></app-adgroup-modal>
  `
})
export class KeywordCardListComponent implements OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  public addgroupIds$: Observable<Array<string>>;

  public addAdgroupModal: boolean = false;

  constructor(
    private keywordMatchingOptionsFacade: KeywordMatchingOptionsFacade
  ) {
    this.addgroupIds$ = this.keywordMatchingOptionsFacade.addgroupIds$.pipe(takeUntil(this.unsubscribe$));
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public onAddAdgroup(result: any): void {
    if (result) {
      this.keywordMatchingOptionsFacade.addAdgroup(result.name, result.campaignId);
    }

    this.addAdgroupModal = false;
  }
}
