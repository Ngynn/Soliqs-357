export class CreateCommentDto {
  constructor(
    public id: string,
    public uid: string,
    public content: string,
    public postId: string,
  ) {}
}
