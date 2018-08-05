import { Action } from '@ngrx/store';
import { ICampaign } from '../campaign.interface';
import { Update } from '@ngrx/entity/src/models';

export const ADD_CAMPAIGN_ACTION = '[KeywordMatchingOptions] Add campaign';
export const EDIT_CAMPAIGN_ACTION = '[KeywordMatchingOptions] Edit campaign';
export const DELETE_CAMPAIGN_ACTION = '[KeywordMatchingOptions] Delete campaign';

export class AddCampaign implements Action {
  readonly type = ADD_CAMPAIGN_ACTION;

  constructor(public payload: { campaign: ICampaign }) {}
}

export class EditCampaign implements Action {
  readonly type = EDIT_CAMPAIGN_ACTION;

  constructor(public payload: { campaign: Update<ICampaign> }) {}
}

export class DeleteCampaignsAction implements Action {
  readonly type = DELETE_CAMPAIGN_ACTION;

  constructor(public payload: { id: string; shouldDeleteAdgroups: boolean }) {}
}

export type CampaignsActions = AddCampaign |
  EditCampaign |
  DeleteCampaignsAction;
