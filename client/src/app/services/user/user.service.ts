import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  create(idToken: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${idToken}`, // Đảm bảo có khoảng cách giữa 'Bearer' và token
    });

    return this.httpClient.post<User>(
      environment.hostingURL + '/v1/user',
      null,
      {
        headers,
      }
    );
  }

  get(uid: string, idToken: string) {
    return this.httpClient.get<User>(
      environment.hostingURL + `/v1/user?id=${uid}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${idToken}`,
        }),
      }
    );
  }
}
