import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group } from 'src/app/models/group.model';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private httpClient: HttpClient) {}

  getGroups() {
    return this.httpClient.get<Group[]>(`http://localhost:3000/v1/group`);
  }

  createGroup(group: Group) {
    return this.httpClient.post<Group>(`http://localhost:3000/v1/group`, group);
  }

  updateGroup(id: string, group: Group) {
    return this.httpClient.put<Group>(
      `http://localhost:3000/v1/group/detail?id=${id}`,
      group
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

  getGroup(id: string, idToken: string) {
    return this.httpClient.get<Group>(`http://localhost:3000/v1/group/detail?id=${id}`,
    {
      headers: new HttpHeaders({
        Authorization: `Bearer ${idToken}`,
      }),
    });
  }
}
