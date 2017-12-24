import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SnackbarNgrxService {
  constructor(
    private snackBar: MatSnackBar,
  ) {}

  public createSnackbar(text: string) {
    this.snackBar.open(text, '', {
      duration: 1500
    });
  }
}
