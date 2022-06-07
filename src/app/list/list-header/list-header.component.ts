import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.scss'],
})
export class ListHeaderComponent implements OnInit {
  @Input() propertyName: string;
  @Input() filterType: 'contains' | '=' | 'startsWith' | 'endsWith';
  @Input() columnType: 'action' | 'text' | 'number' = 'text';
  @Input() allowEditing = false;
  @Input() allowDeleting = false;

  @Output() filter = new EventEmitter<string[]>();

  @HostBinding('class.table-header') tableHeaderClass = true;
  @HostBinding('class.buttons') buttonsClass = false;

  get filterControl(): AbstractControl {
    return this.form.controls.filter;
  }

  private form: UntypedFormGroup = new UntypedFormGroup({
    filter: new UntypedFormControl(null),
  });

  constructor() {
    this.form.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.filter.emit(this.createQuery(value.filter));
    });
  }

  ngOnInit(): void {
    this.buttonsClass = this.columnType === 'action';
  }

  private createQuery(value: string): string[] {
    console.log(value);
    return [this.propertyName, this.filterType, value];
  }
}
