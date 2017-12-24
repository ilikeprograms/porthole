import { IKeyword } from '../keyword.interface';
import { KeywordModifiers } from '../keyword-modifier-enum';

export interface IKeywordMatchingOptionsState {
  matchOption: KeywordModifiers;
  keywords: Array<IKeyword>;
}
