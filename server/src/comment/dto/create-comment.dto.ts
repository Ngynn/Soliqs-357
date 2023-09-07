export class CreateCommentDto {
  constructor(
    public uid: string,
    public content: string,
    public postId: string,
  ) {}
}
