import { EntityState } from '@ngrx/entity';

import { IKeyword } from '../keyword.interface';
import { keywordsAdapter } from './keywords.adapter';

export const KeywordsDefaultState: EntityState<IKeyword> = keywordsAdapter.getInitialState({
  ids: [],
  entities: {}
});
