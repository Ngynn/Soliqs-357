/* eslint-disable prettier/prettier */
export class CreateGroupDto {
    constructor(
        public name: string,
        public owner: string,
        public members: string[],
        public posts: string[],
        public is_Private: boolean,
    ) { }
}
