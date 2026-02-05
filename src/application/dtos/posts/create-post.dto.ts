

export class CreatePostDto {

  private constructor(
    public readonly title: string,
    public readonly body: string
  ) {}

  static create(obj: any): [string | undefined, CreatePostDto?] {

    if (!obj || typeof obj !== 'object') {
      return ['Request body is required'];
    }

    const { title, body } = obj;

    if (!title) return ['title is required'];
    if (!body) return ['body is required'];

    if (typeof title !== 'string') return ['title must be a string'];
    if (typeof body !== 'string') return ['body must be a string'];

    return [undefined, new CreatePostDto(title, body)];
  }
}
