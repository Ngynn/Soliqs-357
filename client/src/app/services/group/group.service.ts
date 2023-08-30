import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group } from 'src/app/models/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private httpClient: HttpClient) { }

  getGroups(id: string) {
    return this.httpClient.get<Group[]>(`http://localhost:3000/v1/group?name=${id}`);
  }

  createGroup(group: Group) {
    return this.httpClient.post<Group>(`http://localhost:3000/v1/group`, group);
  }
}
