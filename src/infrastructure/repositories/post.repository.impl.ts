import { Like, Repository } from 'typeorm';

import { MySQLDatabase } from '../data/mysql';
import { PostEntity } from '../data/mysql/entities/post.entity';

import { PostRepository } from '../../application/repositories/post.repository';
import { GetPostsFilterDto } from '../../application/dtos/posts/get-posts-filter.dto';
import { PaginationDto } from '../../application/dtos/pagination/pagination.dto';
import { PagedResult } from '../../application/dtos/pagination/paged-result';

import { PostMapper } from '../mappers/post.mapper';
import { Post } from '../../domain/entities/post.entity';
import { CustomError } from '../../application/errors/custom.error';

export class PostRepositoryImpl implements PostRepository {

  private readonly repo: Repository<PostEntity>;

  constructor() {
    this.repo = MySQLDatabase
      .getDataSource()
      .getRepository(PostEntity);
  }

  // CREATE
  async create(post: Post): Promise<Post> {
    try {
      const entity = this.repo.create(
        PostMapper.toPersistence(post)
      );

      const saved = await this.repo.save(entity);
      return PostMapper.toDomain(saved);

    } catch (error: any) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw CustomError.badRequest('Post body must be unique');
      }
      throw CustomError.internalServer();
    }
  }

  // FIND BY ID
  async findById(id: string): Promise<Post | null> {
    const entity = await this.repo.findOne({
      where: { id, is_deleted: false }
    });

    return entity ? PostMapper.toDomain(entity) : null;
  }

  // FIND BY FILTERS + PAGINATION
  async findByFilters( filters: GetPostsFilterDto ): Promise<PagedResult<Post>> {

    const { title } = filters;

    const [rows, total] = await this.repo.findAndCount({
      where: {
        is_deleted: false,
        ...(title && { title: Like(`%${title}%`) })
      },
      take: filters.pagination!.pageSize,
      skip: filters.pagination!.offset,
      order: { title: 'ASC' }
    });

    return new PagedResult<Post>(
      total,
      filters.pagination!.page,
      filters.pagination!.pageSize,
      rows.map(PostMapper.toDomain)
    );
  }

  // SOFT DELETE
  async softDelete(id: string): Promise<void> {
    const result = await this.repo.update(
      { id, is_deleted: false },
      { is_deleted: true }
    );

    if (result.affected === 0) {
      throw CustomError.notFound('Post not found');
    }
  }

  // MÉTODO PROPIO
  async findByTitle(title: string): Promise<Post[]> {

    const rows = await this.repo.find({
      where: {
        title: Like(`%${title}%`),
        is_deleted: false
      }
    });

    return rows.map(PostMapper.toDomain);
  }
}
