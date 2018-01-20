import { Injectable } from '@angular/core';
import { CanActivateChild } from '@angular/router';
import { LicenceService } from './licence.service';
import { ILicence } from './licence.interface';

@Injectable()
export class LicenceValidGuard implements CanActivateChild {
  constructor(private licenceService: LicenceService) {}

  public canActivateChild() {
    return this.licenceService.userLicence$.take(1).map((licence: ILicence) => {
      return LicenceService.isLicenceValid(licence);
    });
  }
}


