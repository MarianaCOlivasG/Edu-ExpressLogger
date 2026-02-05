import { PaginationDto } from "../pagination/pagination.dto";


export class GetPostsFilterDto {

  private constructor(
    public readonly query_search?: string,
    public readonly pagination?: PaginationDto
  ) {}

  static create(obj: any): [string | undefined, GetPostsFilterDto?] {

    if (!obj || typeof obj !== 'object') {
      return ['Invalid query params'];
    }

    const query_search = obj.query_search?.toString().trim();

    const [, pagination] = PaginationDto.create(obj);

    return [ undefined, new GetPostsFilterDto(query_search, pagination)];
  }
}
