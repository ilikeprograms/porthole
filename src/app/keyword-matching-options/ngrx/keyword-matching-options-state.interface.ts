import { IKeyword } from '../keyword.interface';
import { IClient } from '../client.interface';
import { ICampaign } from '../campaign.interface';
import { IAdgroup } from '../adgroup-interface';
import { EntityState } from '@ngrx/entity';

export interface IKeywordMatchingOptionsState {
  clients: EntityState<IClient>;
  campaigns: EntityState<ICampaign>;
  adgroups: {
    campaignId?: string;
    ids: Array<string>;
    entities: {[key: string]: IAdgroup};
  };
  keywords: { [key: string]: IKeyword };
}
