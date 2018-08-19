import { LicenceAccessLevelEnum } from './licence-access-level.enum';

export interface ILicence {
  result: boolean;
  accessLevel: LicenceAccessLevelEnum;
  createdTime: string;
}
