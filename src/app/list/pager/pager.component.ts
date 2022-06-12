import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss'],
})
export class PagerComponent {
  @Input() currentPage: number;
  @Input() results: number;
  @Input() totalPages: number;

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  protected [Symbol.iterator] = function*(): Generator {
    yield 1;
    if (this.currentPage > 3) {
      yield '...';
    }
    for (
      let i = this.currentPage <= 2 ? 2 : this.currentPage - 1;
      i < this.totalPages && i <= this.currentPage + 1;
      i++
    ) {
      yield i;
    }
    if (this.currentPage < this.totalPages - 1) {
      yield '...';
    }
    yield this.totalPages;
  };
}
