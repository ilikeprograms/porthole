import { KeywordModifiers } from './keyword-modifier-enum';

export interface IKeyword {
  id?: string;
  modifier: KeywordModifiers;
  text: string;
  selected: boolean;
}
