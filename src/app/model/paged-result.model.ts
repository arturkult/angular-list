export class PagedResult<T> {
  public items: T[];
  public currentPage: number;
  public totalResults: number;

  constructor(items: T[], currentPage: number, totalResults: number) {
    this.items = items;
    this.currentPage = currentPage;
    this.totalResults = totalResults;
  }
}
