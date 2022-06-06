import {
  Component,
  ContentChildren,
  OnInit,
  QueryList,
  AfterContentInit,
  Input,
} from '@angular/core';
import { Data } from '../model/data.model';
import { ColumnInfo } from '../model/column-info.model';
import { ListHeaderComponent } from './list-header/list-header.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, AfterContentInit {
  displayedColumns: ColumnInfo[] = [];
  @Input() dataSource: Data[];

  @ContentChildren(ListHeaderComponent)
  listColumns: QueryList<ListHeaderComponent>;

  constructor() {}

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    this.displayedColumns = this.listColumns.map(
      (item: ListHeaderComponent) => {
        item.filter.subscribe((filter) => console.log(filter));
        return new ColumnInfo(item.propertyName, item.columnType, item.allowEditing, item.allowDeleting);
      }
    );
  }
}
