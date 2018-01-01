import { IKeyword } from '../keyword.interface';
import { IClient } from '../client.interface';
import { ICampaign } from '../campaign.interface';
import { IAdgroup } from '../adgroup-interface';

export interface IKeywordMatchingOptionsState {
  clients: { [key: string]: IClient };
  campaigns: { [key: string]: ICampaign };
  adgroups: {
    campaignId?: string;
    ids: Array<string>;
    entities: {[key: string]: IAdgroup};
  };
  keywords: { [key: string]: IKeyword };
}
