import { takeUntil } from 'rxjs/operators';
import { Component, OnDestroy } from '@angular/core';

import { Observable ,  Subject } from 'rxjs';

import { KeywordMatchingOptionsFacade } from '../../ngrx/keyword-matching-options.facade';
import { IClientWithCampaigns } from '../client-with-campaigns.interface';
import { IClient } from '../client.interface';
import { ICampaign } from '../../campaigns/campaign.interface';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html'
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

  constructor(
    private keywordMatchingOptionsFacade: KeywordMatchingOptionsFacade
  ) {
    this.clientsWithCampaigns$ = this.keywordMatchingOptionsFacade.clientsWithCampaigns$.pipe(takeUntil(this.unsubscribe$));;
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public showDeleteCampaignModal(campaignId: string): void {
    this.campaignToDelete = campaignId;
    this.deleteCampaignModal = true;
  }

  public showAddClientModal(): void {
    this.editClient = false;

    this.addClientModal = true;
  }

  public showEditClientModal(client): void {
    this.editClient = {...client as IClient};

    this.addClientModal = true;
  }

  public showDeleteClientModal(clientId: string): void {
    this.clientToDelete = clientId;

    this.deleteClientModal = true;
  }

  public onAddClient(result: any): void {
    if (result) {
      if (!this.editClient) {
        this.keywordMatchingOptionsFacade.addClient(result.client);
      } else {
        const clientId: IClient = this.editClient as IClient;

        this.keywordMatchingOptionsFacade.editClient(clientId.id, result.client);
      }
    }

    this.addClientModal = false;
  }

  public onDeleteClient(result: any): void {
    if (result) {
      this.keywordMatchingOptionsFacade.deleteClient(this.clientToDelete);
    }

    this.deleteClientModal = false;
  }

  public showAddCampaignModal(clientId: string): void {
    this.clientToAddCampaign = clientId;

    this.editCampaign = false;

    this.addCampaignModel = true;
  }

  public showEditCampaignModal(campaign): void {
    this.editCampaign = { ...campaign as ICampaign };

    this.addCampaignModel = true;
  }

  public onAddCampaign(result: any): void {
    if (result) {
      if (!this.editCampaign) {
        this.keywordMatchingOptionsFacade.addCampaign(this.clientToAddCampaign, result.campaign);
      } else {
        const campaign: ICampaign = this.editCampaign as ICampaign;

        this.keywordMatchingOptionsFacade.editCampaign(campaign.id, result.campaign);
      }
    }

    this.addCampaignModel = false;
  }

  public onDeleteCampaign(result: any): void {
    if (result && result.deleteCampaign) {
      this.keywordMatchingOptionsFacade.deleteCampaign(this.campaignToDelete, result.shouldDeleteAdgroups);
    }

    this.deleteCampaignModal = false;
  }
}
