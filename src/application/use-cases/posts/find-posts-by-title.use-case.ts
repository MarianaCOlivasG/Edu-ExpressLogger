

import { Post } from "../../../domain/entities/post.entity";
import { CustomError } from "../../errors/custom.error";
import { PostRepository } from "../../repositories/post.repository";

export class FindPostsByTitleUseCase {

  constructor(
    private readonly repository: PostRepository
  ) {}

  async execute(title: string): Promise<Post[]> {

    if (!title || !title.trim()) {
      throw CustomError.badRequest('Title is required');
    }

    return this.repository.findByTitle(title.trim());
  }
}
