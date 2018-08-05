import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { IClient } from '../client.interface';

export const clientsAdapter: EntityAdapter<IClient> = createEntityAdapter<IClient>();
