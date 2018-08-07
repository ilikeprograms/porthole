import { ElementRef, Injectable, SimpleChange } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class ResetModalService {
  private form: FormGroup;

  public setFormGroup(form: FormGroup) {
    this.form = form;
  }

  public reset(changes: { [propName: string]: SimpleChange }, firstElementRef: ElementRef ): void {
    if (changes.modalOpen) {
      this.form.reset();

      Object.keys(this.form.controls).forEach((controlName: string) => {
        this.form.controls[controlName].setErrors(null);
      });

      setTimeout(() => {
        firstElementRef.nativeElement.focus();
        firstElementRef.nativeElement.blur();
        firstElementRef.nativeElement.focus();
      }, 0)
    }
  }
}
