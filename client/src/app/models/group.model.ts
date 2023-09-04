export interface Group {
    _id: string;
    name: string,
    owner: string,
    members: string[],
    posts: string[],
    isPrivate: boolean,
}