import { Component } from '@angular/core';
import * as faker from 'faker/locale/pl';
import { Data } from './model/data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-list-component';
  data: Data[];

  /**
   *
   */
  constructor() {
    this.data = this.generateData();
  }

  generateData(): Data[] {
    const arr = [];
    for (let i = 0; i < 10; i++) {
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
}
