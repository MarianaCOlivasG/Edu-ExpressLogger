import { Post } from "../../../domain/entities/post.entity";
import { PostRepository } from "../../repositories/post.repository";



export class GetPostUseCase {

  constructor(
    private readonly repository: PostRepository
  ) {}

  async execute(id: string): Promise<Post | null> {
    return this.repository.findById(id);
  }
}
