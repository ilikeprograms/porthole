import { IAdgroup } from './adgroup-interface';
import { IKeyword } from './keyword.interface';
import { ICampaign } from './campaign.interface';

export interface IAddGroupWithKeywords extends IAdgroup {
  campaign?: ICampaign;
  keywords: Array<IKeyword>;
  keywordSelectedCount: number;
  keywordAllSelected: boolean;
}
