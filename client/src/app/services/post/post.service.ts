import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from 'src/app/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) { }

  getPosts(uid: string) {
    return this.httpClient.get<Post[]>(`http://localhost:3000/v1/post/author/${uid}`);
  }
}
