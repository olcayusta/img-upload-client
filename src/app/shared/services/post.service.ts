import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Post } from '../models/post.model';
import { Image } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPost(postId: string) {
    return this.http.get<Image[]>(`${environment.apiUrl}/posts/${postId}`);
  }

  savePost(client: string) {
    return this.http.post<Post>(`${environment.apiUrl}/posts`, {client});
  }
}
