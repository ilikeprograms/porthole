import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { IKeyword } from '../keyword.interface';

export const keywordsAdapter: EntityAdapter<IKeyword> = createEntityAdapter<IKeyword>();
