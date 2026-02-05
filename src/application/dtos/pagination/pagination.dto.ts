

export class PaginationDto {

  private static readonly MAX_PAGE_SIZE = 50;

  private constructor(
    public readonly page: number,
    public readonly pageSize: number
  ) {}

  static create(obj: any): [string | undefined, PaginationDto?] {

    const page = Number(obj?.page ?? 1);
    const pageSize = Number(obj?.pageSize ?? 10);

    const safePage = isNaN(page) ? 1 : Math.max(1, page);
    const safePageSize = isNaN(pageSize)
      ? 10
      : Math.min(Math.max(1, pageSize), this.MAX_PAGE_SIZE);

    return [undefined, new PaginationDto(safePage, safePageSize)];
  }

  get offset(): number {
    return (this.page - 1) * this.pageSize;
  }
}



