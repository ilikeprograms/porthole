import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { ICampaign } from '../campaign.interface';

export const campaignsAdapter: EntityAdapter<ICampaign> = createEntityAdapter<ICampaign>();
