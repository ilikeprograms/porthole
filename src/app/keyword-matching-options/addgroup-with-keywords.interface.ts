import { IAdgroup } from './adgroup-interface';
import { IKeyword } from './keyword.interface';

export interface IAddGroupWithKeywords extends IAdgroup {
  keywords: Array<IKeyword>;
  keywordSelectedCount: number;
  keywordAllSelected: boolean;
}
