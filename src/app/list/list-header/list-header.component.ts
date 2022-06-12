import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

const directions = {
  asc: 'desc',
  desc: '',
  '': 'asc',
};

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.scss'],
})
export class ListHeaderComponent implements OnInit {
  protected filterControl = new FormControl(null);

  constructor() {
    this.filterControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => {
        if (!value) {
          this.clearFilter();
        } else {
          this.filter.emit(this.createQuery(value));
        }
      });
  }
  @Input() propertyName: string;
  @Input() filterType: 'contains' | '=' | 'startsWith' | 'endsWith';
  @Input() columnType: 'action' | 'text' | 'number' = 'text';
  @Input() allowEditing = false;
  @Input() allowDeleting = false;

  @Output() filter = new EventEmitter<[string, string, string | number] | []>();
  @Output() sortClick = new EventEmitter<{
    propertyName: string;
    direction: string;
  }>();

  @HostBinding('class.w-100') tableHeaderClass = true;
  @HostBinding('class.buttons') buttonsClass = false;

  private currentDirection = '';

  ngOnInit(): void {
    this.buttonsClass = this.columnType === 'action';
  }

  public resetSort(): void {
    this.currentDirection = '';
  }

  protected sort(): void {
    this.currentDirection = directions[this.currentDirection];
    this.sortClick.emit({
      direction: this.currentDirection,
      propertyName: this.propertyName,
    });
  }

  protected clearFilter(): void {
    this.filter.emit([]);
    this.filterControl.reset();
  }

  private createQuery(value: string): [string, string, string | number] | [] {
    return [this.propertyName, this.filterType, value];
  }
}
