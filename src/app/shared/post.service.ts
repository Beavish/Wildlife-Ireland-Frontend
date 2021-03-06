import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostModel } from './post-model';
import { Observable } from 'rxjs';
import { CreatePostPayload } from '../post/create-post/create-post.payload';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>('http://localhost:8080/api/post/all');
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    return this.http.post('http://localhost:8080/api/post/new', postPayload);
  }

  updatePost(postPayload: CreatePostPayload): Observable<any> {
    return this.http.put('http://localhost:8080/api/post/'+ postPayload.post_id, postPayload);
  }

  getPost(id: number): Observable<PostModel> {
    return this.http.get<PostModel>('http://localhost:8080/api/post/' + id);
  }
  
  deletePost(id: number): Observable<PostModel> {
    return this.http.delete<PostModel>('http://localhost:8080/api/post/' + id);
  }

  getAllPostsByUser(name: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>('http://localhost:8080/api/post/by-user/' + name);
  }
  getEducationalPosts(): Observable<PostModel[]> {
    return this.http.get<PostModel[]>('http://localhost:8080/api/post/educational/' );
  }
}