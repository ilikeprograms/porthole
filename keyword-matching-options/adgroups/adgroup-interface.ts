import { KeywordModifiers } from '../keywords/keyword-modifier-enum';

export interface IAdgroup {
  id: string;
  campaignId?: string;
  name: string;
  matchOption: KeywordModifiers;
}
