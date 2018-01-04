import { v4 as uuid } from 'uuid';

import { IKeywordMatchingOptionsState } from './keyword-matching-options-state.interface';
import {
  KeywordMatchingOptionsActions,
} from './keyword-matching-options.actions';

import { IKeyword } from '../keywords/keyword.interface';
import { IAdgroup } from '../adgroups/adgroup-interface';

export function keywordMatchingOptionsReducer(state: IKeywordMatchingOptionsState, action: KeywordMatchingOptionsActions) {
  switch (action.type) {
    default:
      return state;
  }
}
