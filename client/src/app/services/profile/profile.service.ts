import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from 'src/app/models/profile.model';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private httpClient: HttpClient) {}

  create(profile: Profile) {
    return this.httpClient.post<Profile>(
      `http://localhost:3000/v1/profile`,
      profile
    );
  }

  get(id: string) {
    return this.httpClient.get<Profile>(
      `http://localhost:3000/v1/profile?id=${id}`
    );
  }
}
