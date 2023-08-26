import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from 'src/app/models/profile.model';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) { }

  createProfile(profile: Profile, user: User) {
    console.log(profile, user)
    const newProfile: Profile = {
      id: user.uid,
      email: profile.email,
      displayName: user.name,
      userName: profile.userName,
      bio: profile.bio,
      avatar: user.picture,
      coverImg: "",
      followers: [],
      following: [],
      blocked: [],
      posts: [],
      messages: [],
      phone: profile.phone,
    }

    return this.httpClient.post<Profile>(`http://localhost:3000/v1/profile`, newProfile)
  }
}
