import { v4 as uuid } from 'uuid';

import { IKeywordMatchingOptionsState } from './keyword-matching-options-state.interface';
import { KeywordModifiers } from '../keyword-modifier-enum';

const client1Id = uuid();
const client2Id = uuid();
const addgroup1 = uuid();
const addgroup2 = uuid();
const campaignId = uuid();
const keyword1 = uuid();
const keyword2 = uuid();
const keyword3 = uuid();
const keyword4 = uuid();

export const KeywordMatchingOptionsDefaultState: IKeywordMatchingOptionsState = {
  clients: {
    [client1Id]: {
      id: client1Id,
      name: 'bob',
      campaignIds: [
        campaignId
      ],
    },
    [client2Id]: {
      id: client2Id,
      name: 'James',
      campaignIds: [],
    }
  },
  campaigns: {
    [campaignId]: {
      id: campaignId,
      name: 'bob campaign',
    }
  },
  adgroups: {
    ids: [addgroup1, addgroup2],
    entities: {
      [addgroup1]: {
        id: addgroup1,
        name: 'Add group 1',
        matchOption: KeywordModifiers.BroadMatch,
        keywordIds: [
          keyword1,
          keyword2
        ]
      },
      [addgroup2]: {
        id: addgroup2,
        name: 'Add group 2',
        matchOption: KeywordModifiers.BroadMatchModifier,
        keywordIds: [
          keyword3,
          keyword4
        ]
      }
    }
  },
  keywords: {
    [keyword1]: {
      id: keyword1,
      clientId: client1Id,
      adgroupId: addgroup1,
      modifier: KeywordModifiers.BroadMatch,
      text: 'Broad Match',
      selected: false
    },
    [keyword2]: {
      id: keyword2,
      clientId: client1Id,
      adgroupId: addgroup1,
      modifier: KeywordModifiers.PhraseMatch,
      text: 'Phrase Match',
      selected: false
    },
    [keyword3]: {
      id: keyword3,
      clientId: client2Id,
      adgroupId: addgroup2,
      modifier: KeywordModifiers.BroadMatchModifier,
      text: 'Broad Match Modifier',
      selected: false
    },
    [keyword4]: {
      id: keyword4,
      clientId: client2Id,
      adgroupId: addgroup2,
      modifier: KeywordModifiers.ExactMatch,
      text: 'Exact Match',
      selected: false
    }
  }
};
