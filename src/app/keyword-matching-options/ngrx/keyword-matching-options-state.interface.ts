import { IKeyword } from '../keyword.interface';
import { KeywordModifiers } from '../keyword-modifier-enum';
import { IClient } from '../client.interface';

export interface IKeywordMatchingOptionsState {
  clients: Array<IClient>;
  keywords: Array<IKeyword>;
}
