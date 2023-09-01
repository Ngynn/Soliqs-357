export class CreateMessageDto {
  constructor(
    public chatId: string,
    public sender: string,
    public recipient: string,
    public content: string,
    public isDeleted: boolean,
  ) {}
}
