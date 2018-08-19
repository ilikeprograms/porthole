import { Component, EventEmitter } from '@angular/core';
import { ClrDatagridFilterInterface } from '@clr/angular';
import { BehaviorSubject, Subject } from 'rxjs';
import { IKeyword } from '../keyword.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { KeywordModifiers } from '../keyword-modifier-enum';

interface ISelectedModifierFormValues {
  selectedModifier: string;
}

@Component({
  selector: 'app-modifier-filter',
  templateUrl: './modifier-filter.component.html'
})
export class ModifierFilterComponent implements ClrDatagridFilterInterface<IKeyword> {
  public filterForm: FormGroup;

  private ngUnsubscribe$: Subject<void> = new Subject<void>();

  private currentFilter$: BehaviorSubject<KeywordModifiers | string> = new BehaviorSubject('');

  constructor() {
    this.setupForm();
  }

  public ngOnInit(): void {
    this.filterForm.valueChanges.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((values: ISelectedModifierFormValues) => {
      this.currentFilter$.next(values.selectedModifier);
      this.changes.emit(true);
    });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  changes: EventEmitter<boolean> = new EventEmitter<any>(false);

  isActive(): boolean {
    return this.currentFilter$.getValue() !== '';
  }

  accepts(keyword: IKeyword): boolean {
    return keyword.modifier === this.currentFilter$.getValue();
  }

  private setupForm(): void {
    this.filterForm = new FormGroup({
      selectedModifier: new FormControl('', Validators.required)
    });
  }
}
