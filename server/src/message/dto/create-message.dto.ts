export class CreateMessageDto {
    constructor(
        public sender: string,
        public recipient: string,
        public content: string,
        public created_At: string,
    ) { }
}
