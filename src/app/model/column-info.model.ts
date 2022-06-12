export class ColumnInfo {
  public propertyName: string;
  public columnType: 'action' | 'text' | 'number';
  public allowEditing = false;
  public allowDeleting = false;
  public currentFilter: [propertyName: string, operator: string, value: string | number] | [] = [];

  constructor(propertyName: string, columnType: 'action' | 'text' | 'number', allowEditing: boolean, allowDeleting: boolean) {
    this.propertyName = propertyName;
    this.columnType = columnType || 'text';
    this.allowEditing = allowEditing;
    this.allowDeleting = allowDeleting;
  }
}
