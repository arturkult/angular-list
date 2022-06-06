import { BaseFilter } from './base-filter.model';
import { TextFilterType } from './text-filter-type.enum';

export class TextFilter extends BaseFilter {
  constructor(options: { type: TextFilterType; propertyName: string }) {
    super();
    this.type = options.type;
    this.propertyName = options.propertyName;
  }
}
