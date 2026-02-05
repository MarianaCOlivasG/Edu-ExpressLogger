

import { CustomError } from "../../errors/custom.error";
import { PostRepository } from "../../repositories/post.repository";

export class SoftDeletePostUseCase {

  constructor(
    private readonly repository: PostRepository
  ) {}

  async execute(id: string): Promise<void> {

    if (!id) {
      throw CustomError.badRequest('Post id is required');
    }

    const post = await this.repository.findById(id);

    if (!post) {
      throw CustomError.notFound('Post not found');
    }

    await this.repository.softDelete(id);
  }
}
