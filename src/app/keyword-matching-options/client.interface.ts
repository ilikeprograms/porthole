import { KeywordModifiers } from './keyword-modifier-enum';

export interface IClient {
  id: string;
  name: string;
  campaignIds: Array<string>;
}
