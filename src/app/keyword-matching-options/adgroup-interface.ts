import { KeywordModifiers } from './keyword-modifier-enum';

export interface IAdgroup {
  id: string;
  campaignId?: string;
  name: string;
  matchOption: KeywordModifiers;
  keywordIds: Array<string>;
}
