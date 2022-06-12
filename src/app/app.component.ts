import { Component } from '@angular/core';
import * as faker from 'faker/locale/pl';
import Enumerable from 'linq';
import { Data } from './model/data.model';
import { PagedQuery } from './model/paged-query.model';
import { PagedResult } from './model/paged-result.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-list-component';
  private data: Data[];
  protected queryResult: PagedResult<Data> = new PagedResult([], 1, 0);
  /**
   *
   */
  constructor() {
    this.data = this.generateData();
  }

  generateData(): Data[] {
    const arr = [];
    for (let i = 0; i < 100; i++) {
      const data = new Data();
      data.address = faker.address.streetAddress();
      data.name = faker.name.findName();
      data.job = faker.name.jobTitle();
      data.employmentDate = faker.date.past();
      data.salary = faker.finance.amount();
      arr.push(data);
    }
    return arr;
  }

  onQueryChange(query: PagedQuery): void {
    console.log(query);
    let result = Enumerable.from(this.data);

    for (const filter of query.filters) {
      result = result.where((element) => {
        const [propertyName, operator, value] = filter;
        return element[propertyName].includes(value);
      });
    }
    result = result
      .skip(query.resultsPerPage * (query.currentPage - 1))
      .take(query.resultsPerPage);
    if (query.order?.length > 0) {
      const [propertyName, direction] = query.order;
      if (direction === 'asc') {
        result = result.orderBy((element) => element[propertyName]);
      } else {
        result = result.orderByDescending((element) => element[propertyName]);
      }
    }
    this.queryResult = new PagedResult(
      result.toArray(),
      query.currentPage,
      this.data.length
    );
  }
}
