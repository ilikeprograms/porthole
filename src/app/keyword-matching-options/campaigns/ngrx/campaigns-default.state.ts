import { ICampaignState } from './campaigns-state.interface';
import { campaignsAdapter } from './campaigns.adapter';

export const CampaignsDefaultState: ICampaignState = campaignsAdapter.getInitialState({
  ids: [],
  entities: {}
});
