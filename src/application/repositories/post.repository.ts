import { Post } from '../../domain/entities/post.entity';
import { PagedResult } from '../dtos/pagination/paged-result';
import { GetPostsFilterDto } from '../dtos/posts/get-posts-filter.dto';
import { BaseRepository } from './base.repository';

export abstract class PostRepository implements BaseRepository<Post, GetPostsFilterDto> {


  // Base repo
  abstract create(post: Post): Promise<Post>;

  abstract findById(id: string): Promise<Post | null>;

  abstract findByFilters( filters: GetPostsFilterDto ): Promise<PagedResult<Post>>;

  abstract softDelete(id: string): Promise<void>;

  // propios
  abstract findByTitle(title: string): Promise<Post[]>


}
