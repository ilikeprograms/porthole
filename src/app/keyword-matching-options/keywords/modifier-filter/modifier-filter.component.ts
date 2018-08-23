import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { ClrDatagridFilterInterface } from '@clr/angular';
import { BehaviorSubject, Subject } from 'rxjs';

import { IKeyword } from '../keyword.interface';
import { takeUntil } from 'rxjs/operators';
import { KeywordModifiers } from '../keyword-modifier-enum';

@Component({
  selector: 'app-modifier-filter',
  templateUrl: './modifier-filter.component.html'
})
export class ModifierFilterComponent implements OnInit, OnDestroy, ClrDatagridFilterInterface<IKeyword> {
  public filterForm: FormGroup;

  public keywordModifiers: any = KeywordModifiers;

  private ngUnsubscribe$: Subject<void> = new Subject<void>();

  private currentFilter$: BehaviorSubject<Array<boolean>> = new BehaviorSubject([]);

  constructor() {
    this.setupForm();
  }

  public ngOnInit(): void {
    this.filterForm.controls.selectedModifier.valueChanges.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((values: Array<boolean>) => {
      this.currentFilter$.next(values);

      this.changes.emit(true);
    });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  changes: EventEmitter<boolean> = new EventEmitter<any>(false);

  isActive(): boolean {
    const selectedModifiers: Array<boolean> = this.currentFilter$.getValue();

    return selectedModifiers.some((isSelected: boolean) => {
      return isSelected;
    });
  }

  accepts(keyword: IKeyword): boolean {
    const selectedModifiers: Array<boolean> = this.currentFilter$.getValue();

    return selectedModifiers[keyword.modifier];
  }

  private setupForm(): void {
    this.filterForm = new FormGroup({
      selectedModifier: new FormArray([
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
      ])
    });
  }
}
