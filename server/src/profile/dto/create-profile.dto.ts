export class CreateProfileDto {
    constructor(
        public id: string,
        public email: string,
        public displayName: string,
        public userName: string,
        public bio: string,
        public avatar: string,
        public coverImg: string,
        public followers: string[],
        public following: string[],
        public blocked: string[],
        public posts: string[],
        public messages: string[],
        public phone: string,
        public dateOfBirth: string
    ){}
}
