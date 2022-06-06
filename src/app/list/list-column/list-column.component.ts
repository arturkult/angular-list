import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { ColumnInfo } from 'src/app/model/column-info.model';

@Component({
  selector: 'app-list-column',
  templateUrl: './list-column.component.html',
  styleUrls: ['./list-column.component.scss'],
})
export class ListColumnComponent implements OnInit {
  @Input() value: string;
  @Input() columnInfo: ColumnInfo;
  @HostBinding('class.buttons') buttonsClass = false;

  ngOnInit(): void {
    this.buttonsClass = this.columnInfo.columnType === 'action';
  }
}
