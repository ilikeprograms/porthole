import { Component, forwardRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { KeywordModifiers } from '../keyword-modifier-enum';

interface IModifierFormValues {
  modifier: string;
}

@Component({
  selector: 'app-modifier-select',
  templateUrl: './modifier-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ModifiersSelectComponent),
    }
  ]
})
export class ModifiersSelectComponent implements OnInit, OnDestroy, OnChanges, ControlValueAccessor {
  public form: FormGroup;

  public keywordModifiers: any = KeywordModifiers;

  public onChange: (modifier: string) => void;

  private ngUnsubscribe$: Subject<void> = new Subject<void>();

  @Input()
  public validationState: any;

  constructor() {
    this.setupForm();
  }

  public ngOnInit(): void {
    this.form.valueChanges.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((values: IModifierFormValues) => {
      this.onChange(values.modifier);
    });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.validationState) {
      this.form.controls.modifier.updateValueAndValidity();
    }
  }

  public registerOnTouched(fn: any): void {

  }

  public writeValue(obj: any): void {
    if (obj !== null) {
      this.form.setValue({
        modifier: obj
      },{
        emitEvent: false
      });
    } else {
      this.form.reset({
        modifier: ''
      },{
        emitEvent: false
      });
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  private setupForm(): void {
    this.form = new FormGroup({
      modifier: new FormControl('', Validators.required)
    });
  }
}
