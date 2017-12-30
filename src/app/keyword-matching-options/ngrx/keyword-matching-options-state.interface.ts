import { IKeyword } from '../keyword.interface';
import { IClient } from '../client.interface';
import { ICampaign } from '../campaign.interface';

export interface IKeywordMatchingOptionsState {
  clients: Array<IClient>;
  campaigns: Array<ICampaign>;
  keywords: Array<IKeyword>;
}
