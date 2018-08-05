import { IAdgroupState } from './adgroups-state.interface';
import { adgroupAdapter } from './adgroups.adapter';

export const AdgroupDefaultState: IAdgroupState = adgroupAdapter.getInitialState({
  ids: [],
  entities: {}
});
