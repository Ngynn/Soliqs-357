export class CreatePostDto {
    constructor(
        public uid: string,
        public likes: string[],
        public comments: string[],
        public shares: string[],
        public picture: string,
        public content: string
    ) { }
}
