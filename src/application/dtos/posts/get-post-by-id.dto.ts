

export class GetPostByIdDto {

  private constructor(
    public readonly id: string
  ) {}

  static create(obj: any): [string | undefined, GetPostByIdDto?] {

     if (!obj || typeof obj !== 'object') {
      return ['Request params is required'];
    }

    const { id } = obj;

    if (!id) return ['id is required'];

    if (typeof id !== 'string') return ['title must be a string'];

    return [undefined, new GetPostByIdDto(id)];
  }
}
