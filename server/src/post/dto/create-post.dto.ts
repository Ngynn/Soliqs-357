/* eslint-disable prettier/prettier */
export class CreatePostDto {
    constructor(
        public id: string,
        public authorId: string,
        public authorName: string,
        public authorUsername: string,
        public authorAvatar: string,
        public content: string,
        public likes: string[],
        public comments: string[],
        public shares: string[],
        public media: string[],
        public tags: string[],
        public bookmarks: string[],
        public isPrivate: boolean,
    ) { }
}
