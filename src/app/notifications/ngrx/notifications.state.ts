import { EntityState } from '@ngrx/entity';
import { IAdgroup } from '../../keyword-matching-options/adgroups/adgroup-interface';
import { IClarityAlert } from '../clarity-alert.interface';

export interface INotificationsState extends EntityState<IClarityAlert> {

}
