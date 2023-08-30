import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { Post } from 'src/app/models/post.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}
  createUser(idToken: string) {
    console.log(idToken);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${idToken}`, // Đảm bảo có khoảng cách giữa 'Bearer' và token
    });

    return this.httpClient.post<User>('http://localhost:3000/v1/user', null, {
      headers,
    });
  }

  getUser(uid: string,idToken: string) {
    return this.httpClient.get<User>(`http://localhost:3000/v1/user/${uid}`,{
      headers: new HttpHeaders({
        Authorization: `Bearer ${idToken}`
      })
      });
  }
}
