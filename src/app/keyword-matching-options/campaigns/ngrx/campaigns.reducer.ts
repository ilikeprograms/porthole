import { ICampaignState } from './campaigns-state.interface';
import { CampaignsDefaultState } from './campaigns-default.state';
import {
  ADD_CAMPAIGN_ACTION, CampaignsActions, DELETE_CAMPAIGN_ACTION,
  EDIT_CAMPAIGN_ACTION
} from './campaigns.actions';
import { campaignsAdapter } from './campaigns.adapter';
import { DELETE_CLIENT_ACTION, DeleteClientAction } from '../../clients/ngrx/clients-actions';
import { IMPORT_FROM_CHROME_STORAGE, ImportFromChromeStorage } from '../../ngrx/keyword-matching-options.actions';

export function campaignsReducer(state: ICampaignState = CampaignsDefaultState, action: CampaignsActions | DeleteClientAction | ImportFromChromeStorage) {
  switch (action.type) {
    case IMPORT_FROM_CHROME_STORAGE:
      return Object.assign({}, state, {
        ids: action.payload.keywordMatchingOptions.campaigns.ids,
        entities: action.payload.keywordMatchingOptions.campaigns.entities,
      });
    case ADD_CAMPAIGN_ACTION:
      return campaignsAdapter.addOne(action.payload.campaign, state);
    case EDIT_CAMPAIGN_ACTION:
      return campaignsAdapter.updateOne(action.payload.campaign, state);
    case DELETE_CAMPAIGN_ACTION:
      return campaignsAdapter.removeOne(action.payload.id, state);
    case DELETE_CLIENT_ACTION:
      const campaignIds = [];

      [...state.ids].forEach((campaignId: string) => {
        if (state.entities[campaignId].clientId === action.payload.id) {
          campaignIds.push(campaignId);
        }
      });

      return campaignsAdapter.removeMany(campaignIds, state);
    default:
      return state;
  }
}
