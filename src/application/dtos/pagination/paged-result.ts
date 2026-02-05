

export class PagedResult<T> {

  constructor(
    public readonly totalResults: number,
    public readonly currentPage: number,
    public readonly pageSize: number,
    public readonly results: T[]
  ) {}

  get totalPages(): number {
    return Math.ceil(this.totalResults / this.pageSize);
  }
}
