import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { IClarityAlert } from '../clarity-alert.interface';

export const notificationsAdapter: EntityAdapter<IClarityAlert> = createEntityAdapter<IClarityAlert>();
