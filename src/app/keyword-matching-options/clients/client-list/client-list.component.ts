import { takeUntil } from 'rxjs/operators';
import { Component, OnDestroy } from '@angular/core';

import { Observable ,  Subject } from 'rxjs';


import { KeywordMatchingOptionsFacade } from '../../ngrx/keyword-matching-options.facade';
import { ClientAddModalComponent } from '../client-add-modal/client-add-modal.component';
import { IClientWithCampaigns } from '../client-with-campaigns.interface';
import { CampaignDeleteModalComponent } from '../../campaigns/campaign-delete-modal/campaign-delete-modal';
import { IClient } from '../client.interface';
import { CampaignModalComponent } from '../../campaigns/campaign-modal/campaign-modal.component';
import { ICampaign } from '../../campaigns/campaign.interface';
import { DeleteClientConfirmComponent } from '../delete-client-confirm-modal/delete-client-confirm-modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  public addClientModal: boolean = false;
  public addCampaignModel: boolean = false;
  public deleteCampaignModal: boolean = false;
  public deleteClientModal: boolean = false;
  public clientToDelete: string;
  public campaignToDelete: string;
  public clientToAddCampaign: string;
  public editClient: boolean | IClient;
  public editCampaign: boolean | ICampaign;
  public clientsWithCampaigns$: Observable<Array<IClientWithCampaigns>>;

  public clientForm: FormGroup;
  public campaignForm: FormGroup;

  constructor(
    private keywordMatchingOptionsFacade: KeywordMatchingOptionsFacade
  ) {
    this.clientsWithCampaigns$ = this.keywordMatchingOptionsFacade.clientsWithCampaigns$.pipe(takeUntil(this.unsubscribe$));

    this.clientForm = new FormGroup({
      client: new FormControl('', Validators.required)
    });

    this.campaignForm = new FormGroup({
      campaign: new FormControl('', Validators.required)
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public onDeleteCampaign(shouldDeleteAdgroups: boolean): void {
    this.keywordMatchingOptionsFacade.deleteCampaign(this.campaignToDelete, shouldDeleteAdgroups);

    this.deleteCampaignModal = false;
  }

  public onAddClient(): void {
    if (!this.editClient) {
      this.keywordMatchingOptionsFacade.addClient(this.clientForm.value.client);
    } else {
      const clientId: IClient = this.editClient as IClient;

      this.keywordMatchingOptionsFacade.editClient(clientId.id, this.clientForm.value.client);
    }

    this.addClientModal = false;
    this.clientForm.reset();
  }

  public showDeleteClientModal(clientId: string): void {
    this.clientToDelete = clientId;
    this.deleteClientModal = true;
  }

  public showDeleteCampaignModal(campaignId: string): void {
    this.campaignToDelete = campaignId;
    this.deleteCampaignModal = true;
  }

  public showAddClientModal(): void {
    this.editClient = false;

    this.clientForm.patchValue({
      client: ''
    });
    this.clientForm.markAsUntouched();

    this.addClientModal = true;
  }

  public showEditClientModal(client): void {
    this.editClient = client;

    this.clientForm.patchValue({
      client: client.name
    });

    this.addClientModal = true;
  }

  public showAddCampaignModal(clientId: string): void {
    this.clientToAddCampaign = clientId;

    this.editCampaign = false;

    this.campaignForm.patchValue({
      client: ''
    });
    this.campaignForm.markAsUntouched();

    this.addCampaignModel = true;
  }

  public showEditCampaignModal(campaign): void {
    this.editCampaign = campaign;

    this.campaignForm.patchValue({
      client: campaign.name
    });

    this.addCampaignModel = true;
  }

  public onDeleteClient(): void {
    this.keywordMatchingOptionsFacade.deleteClient(this.clientToDelete);

    this.deleteClientModal = false;
  }

  public onAddCampaign(): void {
    if (!this.editCampaign) {
      this.keywordMatchingOptionsFacade.addCampaign(this.clientToAddCampaign, this.campaignForm.value.campaign);
    } else {
      const campaign: ICampaign = this.editCampaign as ICampaign;

      this.keywordMatchingOptionsFacade.editCampaign(campaign.id, this.campaignForm.value.campaign);
    }

    this.addCampaignModel = false;
  }
}
