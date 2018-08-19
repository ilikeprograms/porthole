import { Action } from '@ngrx/store';
import { ICampaign } from '../campaign.interface';
import { Update } from '@ngrx/entity/src/models';

export enum CampaignsActionTypes {
  ADD_CAMPAIGN = '[Campaigns] Add campaign',
  EDIT_CAMPAIGN = '[Campaigns] Edit campaign',
  DELETE_CAMPAIGN = '[Campaigns] Delete campaign'
}

export class AddCampaign implements Action {
  readonly type = CampaignsActionTypes.ADD_CAMPAIGN;

  constructor(public payload: { campaign: ICampaign }) {}
}

export class EditCampaign implements Action {
  readonly type = CampaignsActionTypes.EDIT_CAMPAIGN;

  constructor(public payload: { campaign: Update<ICampaign> }) {}
}

export class DeleteCampaignsAction implements Action {
  readonly type = CampaignsActionTypes.DELETE_CAMPAIGN;

  constructor(public payload: { id: string; shouldDeleteAdgroups: boolean }) {}
}

export type CampaignsActionsUnion = AddCampaign |
  EditCampaign |
  DeleteCampaignsAction;
