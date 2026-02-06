import { Like, Repository } from 'typeorm';

import { MySQLDatabase } from '../data/mysql';
import { PostEntity } from '../data/mysql/entities/post.entity';

import { PostRepository } from '../../application/repositories/post.repository';
import { GetPostsFilterDto } from '../../application/dtos/posts/get-posts-filter.dto';
import { PagedResult } from '../../application/dtos/pagination/paged-result';

import { PostMapper } from '../mappers/post.mapper';
import { Post } from '../../domain/entities/post.entity';
import { CustomError } from '../../application/errors/custom.error';
import { QueryRunner } from 'typeorm';

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

    const { query_search } = filters;

    const [rows, total] = await this.repo.findAndCount({
      where: {
        is_deleted: false,
        ...(query_search && { title: Like(`%${query_search}%`) })
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


    async createWithAudit(post: Post, createdBy: string): Promise<Post> {

    const queryRunner: QueryRunner =
      MySQLDatabase.getDataSource().createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      const postEntity = queryRunner.manager.create(
        PostEntity,
        PostMapper.toPersistence(post)
      );

      const savedPost = await queryRunner.manager.save(postEntity);

      // const audit = queryRunner.manager.create(PostAuditEntity, {
      //   post_id: savedPost.id,
      //   action: 'CREATE',
      //   created_by: createdBy,
      // });

      // await queryRunner.manager.save(audit);

      await queryRunner.commitTransaction();

      return PostMapper.toDomain(savedPost);

    } catch (error: any) {

      await queryRunner.rollbackTransaction();

      if (error.code === 'ER_DUP_ENTRY') {
        throw CustomError.badRequest('Post body must be unique');
      }

      throw CustomError.internalServer();

    } finally {

      // 🔚 Liberar conexión SIEMPRE
      await queryRunner.release();
    }
  }


}
