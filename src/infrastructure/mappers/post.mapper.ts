import { CustomError } from '../../application/errors/custom.error';
import { Post } from '../../domain/entities/post.entity';
import { PostEntity } from '../data/mysql/entities/post.entity';

export class PostMapper {

  static toDomain(entity: PostEntity): Post {

    const { id, title, body, is_deleted } = entity;

    if (!id) throw CustomError.internalServer(`PostEntity: 'id' is missing`);
    if (!title) throw CustomError.internalServer(`PostEntity: 'title' is missing`);
    if (!body) throw CustomError.internalServer(`PostEntity: 'body' is missing`);

    return new Post(
      id,
      title,
      body,
      is_deleted
    );
  }

  static toDomainList(entities: PostEntity[]): Post[] {
    return entities.map(PostMapper.toDomain);
  }

  static toPersistence(post: Post): Partial<PostEntity> {
    return {
      id: post.id,
      title: post.title,
      body: post.body,
      is_deleted: post.isDeleted
    };
  }
}
