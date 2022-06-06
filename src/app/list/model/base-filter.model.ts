import { TextFilterType } from './text-filter-type.enum';

export abstract class BaseFilter {
  protected type: TextFilterType;
  protected propertyName: string;

  public build(value: string): string[] {
    return value ? [this.propertyName, this.type, value] : [];
  }
}
