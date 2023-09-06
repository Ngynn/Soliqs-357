import { Profile } from "./profile.model";

export interface Post {
    _id: string,
    id: string,
    authorId: Profile,
    content: string,
    likes: string[],
    comments: string[],
    shares: string[],
    media: string[],
    tags: string[],
    bookmarks: string[],
    isPrivate: boolean,
    createdAt: string
}