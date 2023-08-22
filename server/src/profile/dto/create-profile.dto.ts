export class CreateProfileDto {
    constructor(
        public id: string,
        public email: string,
        public displayName: string,
        public userName: string,
        public bio: string,
        public avatar: string,
        public coverImg: string,
        public followers: number,
        public following: number,
        public blocked: string[],
        public posts: string[],
        public messages: string[],
    ){}
}
