import { KeywordModifiers } from './keyword-modifier-enum';

export interface IAdgroup {
  id: string;
  name: string;
  matchOption: KeywordModifiers;
  keywordIds: Array<string>;
}
