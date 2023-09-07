import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment } from 'src/app/models/comment.model';
import { environment } from 'src/environments/environment';

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
      environment.hostingURL + `/v1/comment?postId=${postId}`,
      {
        headers,
      }
    );
  }

  createComment(comment: Comment, idToken: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${idToken}`,
    });

    return this.httpClient.post<Comment>(
      environment.hostingURL + `/v1/comment?id=${comment.postId}`,
      comment,
      { headers }
    );
  }
}
