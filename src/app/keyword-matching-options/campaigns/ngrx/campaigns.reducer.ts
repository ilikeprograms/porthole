import { ICampaignState } from './campaigns-state.interface';
import { CampaignsDefaultState } from './campaigns-default.state';
import { CampaignsActionTypes, CampaignsActionsUnion } from './campaigns.actions';
import { campaignsAdapter } from './campaigns.adapter';
import { ClientActionTypes, DeleteClientAction } from '../../clients/ngrx/clients.actions';
import { IMPORT_FROM_CHROME_STORAGE, ImportFromChromeStorage } from '../../ngrx/keyword-matching-options.actions';

export function campaignsReducer(state: ICampaignState = CampaignsDefaultState, action: CampaignsActionsUnion | DeleteClientAction | ImportFromChromeStorage) {
  switch (action.type) {
    case IMPORT_FROM_CHROME_STORAGE:
      return Object.assign({}, state, {
        ids: action.payload.keywordMatchingOptions.campaigns.ids,
        entities: action.payload.keywordMatchingOptions.campaigns.entities,
      });
    case CampaignsActionTypes.ADD_CAMPAIGN:
      return campaignsAdapter.addOne(action.payload.campaign, state);
    case CampaignsActionTypes.EDIT_CAMPAIGN:
      return campaignsAdapter.updateOne(action.payload.campaign, state);
    case CampaignsActionTypes.DELETE_CAMPAIGN:
      return campaignsAdapter.removeOne(action.payload.id, state);
    case ClientActionTypes.DELETE_CLIENT:
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
