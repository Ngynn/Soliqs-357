/* eslint-disable prettier/prettier */
export class CreateProfileDto {
  constructor(
    public id: string,
    public userName: string,
    public displayName: string,
    public email: string,
    public phone: string,
    public country: string,
    public avatar: string,
    public cover: string,
    public bio: string,
    public gender: string,
    public followers: string[],
    public following: string[],
    public blocked: string[],
  ) {}
}
