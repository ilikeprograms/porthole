import { v4 as uuid } from 'uuid';

import { IKeywordMatchingOptionsState } from './keyword-matching-options-state.interface';
import { KeywordModifiers } from '../keyword-modifier-enum';

const client1Id = uuid();
const client2Id = uuid();

export const KeywordMatchingOptionsDefaultState: IKeywordMatchingOptionsState = {
  clients: [{
    id: client1Id,
    name: 'bob',
    matchOption: KeywordModifiers.BroadMatch
  }, {
    id: client2Id,
    name: 'James',
    matchOption: KeywordModifiers.BroadMatchModifier
  }],
  keywords: [
    { id: uuid(), clientId: client1Id, modifier: KeywordModifiers.BroadMatch, text: 'Broad Match', selected: false },
    { id: uuid(), clientId: client1Id, modifier: KeywordModifiers.PhraseMatch, text: 'Phrase Match', selected: false },
    { id: uuid(), clientId: client2Id, modifier: KeywordModifiers.BroadMatchModifier, text: 'Broad Match Modifier', selected: false },
    { id: uuid(), clientId: client2Id, modifier: KeywordModifiers.ExactMatch, text: 'Exact Match', selected: false }
  ]
};
