export class CreateUserDto {
    constructor(
        public uid: string,
        public email: string,
        public name: string,
        public  picture: string
    ){}
}
