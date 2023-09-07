import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment } from 'src/app/models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private httpClient: HttpClient) {}

  getComments(idToken: string, postId: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${idToken}`,
    });
    console.log('postIdservice', postId);
    console.log('idToken', idToken);
    return this.httpClient.get<Comment[]>(
      `http://localhost:3000/v1/comment?postId=${postId}`,
      {
        headers,
      }
    );
  }

  createComment(comment: Comment, idToken: string, postId: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${idToken}`,
    });

    return this.httpClient.post<Comment>(
      `http://localhost:3000/v1/comment?id=${postId}`,
      comment,
      { headers }
    );
  }
}
