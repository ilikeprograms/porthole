import { LicenceAccessLevelEnum } from './licence-access-level.enum';

export interface ILicence {
  result: any;
  accessLevel: LicenceAccessLevelEnum;
  createdTime: string;
}
