

export class SoftDeletePostDto {

  private constructor(
    public readonly id: string
  ) {}

  static create(obj: any): [string | undefined, SoftDeletePostDto?] {

    if (!obj || typeof obj !== 'object') {
      return ['Invalid params'];
    }

    const { id } = obj;

    if (!id || typeof id !== 'string' || !id.trim()) {
      return ['Post id is required'];
    }

    return [undefined, new SoftDeletePostDto(id.trim())];
  }
}
