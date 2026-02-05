import { CreatePostDto } from "../../dtos/posts/create-post.dto";
import { Post } from "../../../domain/entities/post.entity";
import { PostRepository } from "../../repositories/post.repository";
import { randomUUID } from "crypto";

export class CreatePostUseCase {

  constructor(
    private readonly repository: PostRepository
  ) {}

  async execute(dto: CreatePostDto): Promise<Post> {

    const post = new Post(
      randomUUID(),
      dto.title,
      dto.body,
      false
    );

    return this.repository.create(post);
  }
}
