export class PagedQuery {
  public currentPage: number;
  public resultsPerPage: number;
  public filters: [propertyName: string, operator: string, value: string | number][];
  public order: any[];

  constructor(
    currentPage: number,
    resultsPerPage: number,
    filters: any[],
    order: any[]
  ) {
    this.currentPage = currentPage;
    this.resultsPerPage = resultsPerPage;
    this.filters = filters;
    this.order = order;
  }

  static deafult(): PagedQuery {
    return new PagedQuery(1, 10, [], []);
  }
}
