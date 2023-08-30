export class CreateChatDto {
    constructor(
        public name: string,
        public userId: string,
        public messages: string,
    ) { }
}
