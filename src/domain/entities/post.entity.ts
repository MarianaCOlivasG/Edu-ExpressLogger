
export class Post {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly body: string,
    public readonly isDeleted: boolean
  ) {}
}
