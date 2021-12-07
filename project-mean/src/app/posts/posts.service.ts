import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';

import { Post } from './post.model';
import { Result, ResultUpdate } from './result.model';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private httpClient: HttpClient) {

  }

  getPost(id: string): Observable<Post> {
    return new Observable((observer) => {
      this.httpClient.get<Result>('http://localhost:3000/api/posts/' + id)
      .pipe(map(result => {
        console.log(result.message);

        return {
          id: result.posts._id,
          title: result.posts.title,
          content: result.posts.content,
        }
      }))
      .subscribe((postData) => {
        observer.next(postData);
      });
    });
  }

  getPosts(): void {
    this.httpClient.get<Result>('http://localhost:3000/api/posts')
    .pipe(map(result => {
      console.log(result.message);

      return result.posts.map(post => {
        return {
          id: post._id,
          title: post.title,
          content: post.content,
        }
      });
    }))
    .subscribe((postData) => {
      this.posts = postData;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  updatePost(id: string, title: string, content: string): Observable<boolean> {
    return new Observable((observer) => {
      const post: Post = { id: id, title: title, content: content};

      this.httpClient.put('http://localhost:3000/api/posts', post)
      .subscribe((result: Result) => {
        console.log(result.message);

        this.getPosts();

        observer.next(true);
      });
    });
  }

  addPost(title: string, content: string): Observable<boolean> {
    return new Observable((observer) => {
      const post: Post = { id: null, title: title, content: content};

      this.httpClient.post('http://localhost:3000/api/posts', post)
      .subscribe((result: ResultUpdate) => {
        console.log(result.message);

        post.id = result.id;

        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);

        observer.next(true);
      });
    });
  }

  deletePost(id: string){
    this.httpClient.delete('http://localhost:3000/api/posts/' + id)
    .subscribe((result: Result) => {
      console.log(result.message);
      this.getPosts();
    });
  }
}
