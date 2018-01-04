import { KeywordModifiers } from './keyword-modifier-enum';

export interface IKeyword {
  id: string;
  adgroupId?: string;
  modifier: KeywordModifiers;
  text: string;
  selected: boolean;
}
