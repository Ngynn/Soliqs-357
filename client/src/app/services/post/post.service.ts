import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from 'src/app/models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private httpClient: HttpClient) {}

  getPosts(idToken: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${idToken}`
    });

    return this.httpClient.get<Post[]>(
      `http://localhost:3000/v1/post/all`,
       {headers}
    );
  }

  createPost(post: any, idToken: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${idToken}`
    });

    return this.httpClient.post<Post>(`http://localhost:3000/v1/post`, post, {headers});
  }
}
