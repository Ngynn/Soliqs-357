export class CreateCommentDto {
  constructor(
    public id: string,
    public UID: string,
    public content: string,
    public postId: string,
  ) {}
}
