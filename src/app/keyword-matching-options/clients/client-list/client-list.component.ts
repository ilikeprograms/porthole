import { Component, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { KeywordMatchingOptionsFacade } from '../../ngrx/keyword-matching-options.facade';
import { ClientAddModalComponent } from '../client-add-modal/client-add-modal.component';
import { IClientWithCampaigns } from '../../client-with-campaigns.interface';
import { CampaignDeleteModalComponent } from '../../campaigns/campaign-delete-modal/campaign-delete-modal';
import { IClient } from '../../client.interface';
import { CampaignModalComponent } from '../../campaigns/campaign-modal/campaign-modal.component';
import { ICampaign } from '../../campaign.interface';
import { DeleteClientConfirmComponent } from '../delete-client-confirm-modal/delete-client-confirm-modal';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styles: [`
    .toolbar-spacer {
      flex: 1 1 auto;
    }

    .tab-content {
      padding: 1rem;
    }
  `]
})
export class ClientListComponent implements OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  public clientsWithCampaigns$: Observable<Array<IClientWithCampaigns>>;

  constructor(
    private keywordMatchingOptionsFacade: KeywordMatchingOptionsFacade,
    private dialog: MatDialog
  ) {
    this.clientsWithCampaigns$ = this.keywordMatchingOptionsFacade.clientsWithCampaigns$.takeUntil(this.unsubscribe$);
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public onDeleteCampaign(id: string): void {
    // Open confirmation dialog, then remove all if yes is clicked
    const dialogRef: MatDialogRef<CampaignDeleteModalComponent> = this.dialog.open(CampaignDeleteModalComponent);

    dialogRef.afterClosed().take(1).subscribe(result => {
      if (result === false || result === true) {
        this.keywordMatchingOptionsFacade.deleteCampaign(id, result);
      }
    });
  }

  public onAddClient(): void {
    // Open confirmation dialog, then remove all if yes is clicked
    const dialogRef: MatDialogRef<ClientAddModalComponent> = this.dialog.open(ClientAddModalComponent);

    dialogRef.afterClosed().take(1).subscribe(result => {
      if (result && result.trim()) {
        this.keywordMatchingOptionsFacade.addClient(result.trim());
      }
    });
  }

  public onEditClient(client: IClient): void {
    // Open confirmation dialog, then remove all if yes is clicked
    const dialogRef: MatDialogRef<ClientAddModalComponent> = this.dialog.open(ClientAddModalComponent, {
      data: {
        client
      }
    });

    dialogRef.afterClosed().take(1).subscribe(result => {
      if (result && result.trim() && client.name !== result.trim()) {
        this.keywordMatchingOptionsFacade.editClient(client.id, result.trim());
      }
    });
  }

  public onDeleteClient(id: string): void {
    // Open confirmation dialog, then remove all if yes is clicked
    const dialogRef: MatDialogRef<DeleteClientConfirmComponent> = this.dialog.open(DeleteClientConfirmComponent);

    dialogRef.afterClosed().take(1).subscribe(result => {
      if (result) {
        this.keywordMatchingOptionsFacade.deleteClient(id);
      }
    });
  }

  public onAddCampaign(clientId: string): void {
    // Open confirmation dialog, then remove all if yes is clicked
    const dialogRef: MatDialogRef<CampaignModalComponent> = this.dialog.open(CampaignModalComponent);

    dialogRef.afterClosed().take(1).subscribe(result => {
      if (result && result.trim()) {
        this.keywordMatchingOptionsFacade.addCampaign(clientId, result.trim());
      }
    });
  }

  public onEditCampaign(campaign: ICampaign): void {
    // Open confirmation dialog, then remove all if yes is clicked
    const dialogRef: MatDialogRef<CampaignModalComponent> = this.dialog.open(CampaignModalComponent, {
      data: {
        campaign
      }
    });

    dialogRef.afterClosed().take(1).subscribe(result => {
      if (result && result.trim() && campaign.name !== result.trim()) {
        this.keywordMatchingOptionsFacade.editCampaign(campaign.id, result.trim());
      }
    });
  }
}
