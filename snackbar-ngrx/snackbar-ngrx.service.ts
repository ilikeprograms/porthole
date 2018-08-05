import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable()
export class SnackbarNgrxService {
  constructor(
    private snackBar: MatSnackBar,
  ) {}

  public createTextSnackbar(text: string, config?: MatSnackBarConfig): void {
    this.snackBar.open(text, '', config);
  }
}
