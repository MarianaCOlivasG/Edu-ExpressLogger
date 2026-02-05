import { PaginationDto } from "../pagination/pagination.dto";


export class GetPostsFilterDto {

  private constructor(
    public readonly title?: string,
    public readonly pagination?: PaginationDto
  ) {}

  static create(obj: any): [string | undefined, GetPostsFilterDto?] {

    if (!obj || typeof obj !== 'object') {
      return ['Invalid query params'];
    }

    const title = obj.title?.toString();

    const [, pagination] = PaginationDto.create(obj);

    return [ undefined, new GetPostsFilterDto(title, pagination)];
  }
}
