import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from 'src/app/models/profile.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private httpClient: HttpClient) {}

  create(profile: Profile) {
    return this.httpClient.post<Profile>(
      environment.hostingURL + `/v1/profile`,
      profile
    );
  }

  get(id: string, idToken: string) {
    return this.httpClient.get<Profile>(
      environment.hostingURL + `/v1/profile?id=${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${idToken}`,
        }),
      }
    );
  }

  update(id: string, profile: Profile, idToken: string) {
    return this.httpClient.put<Profile>(
      environment.hostingURL + `/v1/profile?id=${id}`,
      profile,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${idToken}`,
        }),
      }
    );
  }
}
