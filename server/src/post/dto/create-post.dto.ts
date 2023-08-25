/* eslint-disable prettier/prettier */
export class CreatePostDto {
    constructor(
        public readonly authorId: string,
        public readonly id: string,
        public readonly displayName: string,
        public readonly username: string,
        public readonly avatar: string,
        public readonly likes: string[],
        public readonly comments: string[],
        public readonly shares: string[],
        public readonly picture: string,
        public readonly content: string,
    ) { }
}
