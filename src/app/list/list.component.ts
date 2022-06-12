import {
  Component,
  ContentChildren,
  OnInit,
  QueryList,
  AfterContentInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Data } from '../model/data.model';
import { ColumnInfo } from '../model/column-info.model';
import { ListHeaderComponent } from './list-header/list-header.component';
import { PagedQuery } from '../model/paged-query.model';
import { PagedResult } from '../model/paged-result.model';
import Enumerable from 'linq';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, AfterContentInit {
  @Input() protected dataSource: PagedResult<Data> | undefined;
  @Output() queryChange = new EventEmitter<PagedQuery>();
  @Output('edit') editClicked = new EventEmitter<Data>();
  @Output('delete') deleteClicked = new EventEmitter<Data>();

  @ContentChildren(ListHeaderComponent)
  listColumns!: QueryList<ListHeaderComponent>;

  currentQuery = PagedQuery.deafult();
  displayColumns: Map<string, ColumnInfo> = new Map();
  orderColumns: string[] = [];
  currentSort: string[] = [];

  constructor() {}

  emitQuery(): void {
    const filters = [];
    for (const column of this.displayColumns.values()) {
      if (column.currentFilter.length > 0) {
        filters.push(column.currentFilter);
      }
    }
    this.currentQuery.filters = filters;
    this.currentQuery.order = this.currentSort;
    this.queryChange.emit(this.currentQuery);
  }

  onPageChange(page: number): void {
    this.currentQuery.currentPage = page;
    this.emitQuery();
  }

  onPageSizeChange(pageSize: number): void {
    this.currentQuery.resultsPerPage = pageSize;
    this.emitQuery();
  }

  ngOnInit(): void {
    this.queryChange.emit(this.currentQuery);
  }
  ngAfterContentInit(): void {
    this.listColumns.forEach((item: ListHeaderComponent) => {
      this.orderColumns.push(item.propertyName);
      item.filter.subscribe((filter) => {
        const column = this.displayColumns.get(item.propertyName);
        if (column) {
          column.currentFilter = filter;
          this.emitQuery();
        }
      });
      item.sortClick.subscribe((sortDirection) => {
        Enumerable.from(this.listColumns.toArray())
          .where((column) => column.propertyName !== item.propertyName)
          .forEach((column) => column.resetSort());
        if (sortDirection.direction) {
          this.currentSort = [sortDirection.propertyName, sortDirection.direction];
        }
        else{
          this.currentSort = [];
        }
        this.emitQuery();
      });
      this.displayColumns.set(
        item.propertyName,
        new ColumnInfo(
          item.propertyName,
          item.columnType,
          item.allowEditing,
          item.allowDeleting
        )
      );
    });
  }
}
