import { IClient } from './client.interface';
import { ICampaign } from './campaign.interface';

export interface IClientWithCampaigns extends IClient {
  campaigns: Array<ICampaign>;
}
