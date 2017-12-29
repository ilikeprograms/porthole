import { KeywordModifiers } from './keyword-modifier-enum';

export interface IKeyword {
  id?: string;
  clientId: string;
  modifier: KeywordModifiers;
  text: string;
  selected: boolean;
}
