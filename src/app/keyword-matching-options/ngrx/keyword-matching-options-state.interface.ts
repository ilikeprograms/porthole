import { EntityState } from '@ngrx/entity';

import { IKeyword } from '../keywords/keyword.interface';
import { IClient } from '../clients/client.interface';
import { ICampaign } from '../campaigns/campaign.interface';
import { IAdgroup } from '../adgroups/adgroup-interface';

export interface IKeywordMatchingOptionsState {
  clients: EntityState<IClient>;
  campaigns: EntityState<ICampaign>;
  adgroups: EntityState<IAdgroup>;
  keywords: EntityState<IKeyword>;
}
