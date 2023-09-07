import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private httpClient: HttpClient) {}

  getPosts(idToken: string, page: number, pageSize: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${idToken}`,
    });

    return this.httpClient.get<Post[]>(
      environment.hostingURL +
        `/v1/post/all?page=${page}&limit=${pageSize}&sortBy=createdAt&sortOrder=desc`,
      { headers }
    );
  }
  getPostById(idToken: string, id: string | null) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${idToken}`,
    });
    return this.httpClient.get<Post>(
      environment.hostingURL + `/v1/post?id=${id}`,
      { headers }
    );
  }

  createPost(post: any, idToken: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${idToken}`,
    });

    return this.httpClient.post<Post>(
      environment.hostingURL + `/v1/post`,
      post,
      {
        headers,
      }
    );
  }
}
