import { IAdgroup } from './adgroups/adgroup-interface';
import { IKeyword } from './keywords/keyword.interface';
import { ICampaign } from './campaigns/campaign.interface';

export interface IAddGroupWithKeywords extends IAdgroup {
  campaign?: ICampaign;
  keywords: Array<IKeyword>;
  keywordSelectedCount: number;
  keywordAllSelected: boolean;
}
