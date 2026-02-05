import { Post } from "../../../domain/entities/post.entity";
import { PagedResult } from "../../dtos/pagination/paged-result";
import { PaginationDto } from "../../dtos/pagination/pagination.dto";
import { PostRepository } from "../../repositories/post.repository";
import { GetPostsFilterDto } from "../../dtos/posts/get-posts-filter.dto";



export class GetPostsUseCase {

  constructor(
    private readonly repository: PostRepository
  ) {}

  execute( filters: GetPostsFilterDto ): Promise<PagedResult<Post>> {
    return this.repository.findByFilters(filters);
  }
}
