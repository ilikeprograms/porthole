import { IClient } from './client.interface';
import { ICampaign } from '../campaigns/campaign.interface';

export interface IClientWithCampaigns extends IClient {
  campaigns: Array<ICampaign>;
}
