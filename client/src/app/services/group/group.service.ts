import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group } from 'src/app/models/group.model';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private httpClient: HttpClient) {}

  getAll(idToken: string, uid: string) {
    return this.httpClient.get<Group[]>(
      `http://localhost:3000/v1/group/all?uid=${uid}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${idToken}`,
        }),
      }
    );
  }

  create(idToken: string, group: Group) {
    return this.httpClient.post<Group>(
      `http://localhost:3000/v1/group`,
      group,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${idToken}`,
        }),
      }
    );
  }

  update(idToken: string, id: string, group: Group) {
    return this.httpClient.put<Group>(
      `http://localhost:3000/v1/group/detail?id=${id}`,
      group,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${idToken}`,
        }),
      }
    );
  }

  join(id: string, uid: string, idToken: string) {
    return this.httpClient.put<Group>(
      `http://localhost:3000/v1/group/join?id=${id}&uid=${uid}`,
      null,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${idToken}`,
        }),
      }
    );
  }

  getOne(id: string, idToken: string) {
    return this.httpClient.get<Group>(
      `http://localhost:3000/v1/group/detail?id=${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${idToken}`,
        }),
      }
    );
  }

  getJoined(uid: string, idToken: string) {
    return this.httpClient.get<Group[]>(
      `http://localhost:3000/v1/group/joined?uid=${uid}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${idToken}`,
        }),
      }
    );
  }
}
