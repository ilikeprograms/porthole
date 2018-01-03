import { ICampaignState } from './campaigns-state.interface';
import { CampaignsDefaultState } from './campaigns-default.state';
import {
  ADD_CAMPAIGN_ACTION, CampaignsActions, DELETE_CAMPAIGN_ACTION,
  EDIT_CAMPAIGN_ACTION
} from './campaigns.actions';
import { campaignsAdapter } from './campaigns.adapter';
import { DELETE_CLIENT_ACTION, DeleteClientAction } from '../../clients/ngrx/clients-actions';

export function campaignsReducer(state: ICampaignState = CampaignsDefaultState, action: CampaignsActions | DeleteClientAction) {
  switch (action.type) {
    case ADD_CAMPAIGN_ACTION:
      return campaignsAdapter.addOne(action.payload.campaign, state);
    case EDIT_CAMPAIGN_ACTION:
      return campaignsAdapter.updateOne(action.payload.campaign, state);
    case DELETE_CAMPAIGN_ACTION:
      return campaignsAdapter.removeOne(action.payload.id, state);
    case DELETE_CLIENT_ACTION:
      const campaignIds = [];
      const ids: Array<string> = state.ids as any;

      ids.forEach((campaignId: string) => {
        if (state.entities[campaignId].clientId === action.payload.id) {
          campaignIds.push(campaignId);
        }
      });

      return campaignsAdapter.removeMany(campaignIds, state);
      // const campaigns = Object.assign({}, state.campaigns);
      // const addgroupsToRemoveCampaign = Object.assign({}, state.adgroups);
      // const keywordsToRemoveFromAdgroup = Object.assign({}, state.keywords);
      //
      // if (action.shouldDeleteAdgroups) {
      //   let keywordIds: Array<string> = [];
      //
      //   addgroupsToRemoveCampaign.ids.forEach((adgroupId: string) => {
      //     if (addgroupsToRemoveCampaign.entities[adgroupId].campaignId === action.id) {
      //       keywordIds = keywordIds.concat(addgroupsToRemoveCampaign.entities[adgroupId].keywordIds);
      //
      //       delete addgroupsToRemoveCampaign.entities[adgroupId];
      //       delete addgroupsToRemoveCampaign.ids[addgroupsToRemoveCampaign.ids.indexOf(adgroupId)];
      //     }
      //   });
      //
      //   keywordIds.forEach((keywordIdToRemoveFromAdgroup: string) => {
      //     delete keywordsToRemoveFromAdgroup[keywordIdToRemoveFromAdgroup];
      //   });
      // }
      //
      // delete campaigns[action.id];

      // return {
      //   ...state,
      //   // campaigns: campaigns,
      //   // adgroups: addgroupsToRemoveCampaign,
      //   // keywords: keywordsToRemoveFromAdgroup
      // };
    default:
      return {
        ...state
      };
  }
}
