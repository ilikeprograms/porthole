import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { IAdgroup } from '../adgroup-interface';

export const adgroupAdapter: EntityAdapter<IAdgroup> = createEntityAdapter<IAdgroup>();
