/* eslint-disable prettier/prettier */
export class CreateProfileDto {
  constructor(
    public id: string,
    private userName: string,
    private displayName: string,
    private email: string,
    private phone: string,
    private country: string,
    private avatar: string,
    private cover: string,
    private bio: string,
    private gender: string,
    private followers: string[],
    private following: string[],
    private blocked: string[],
  ) {}
}
