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
          imagePath: result.posts.imagePath
        }
      }))
      .subscribe((postData) => {
        observer.next(postData);
        observer.complete();
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
          imagePath: post.imagePath
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

  updatePost(id: string, title: string, content: string, image: File | string): Observable<boolean> {
    return new Observable((observer) => {
      let post: Post | FormData;

      if(typeof(image) === 'object') {
        post = new FormData();

        post.append('id', id);
        post.append('title', title);
        post.append('content', content);
        post.append('image', image, title);
      }
      else {
        post = { id: id, title: title, content: content, imagePath: image };
      }

      this.httpClient.put('http://localhost:3000/api/posts', post)
      .subscribe((result: Result) => {
        console.log(result.message);

        this.getPosts();

        observer.next(true);
        observer.complete();
      });
    });
  }

  addPost(title: string, content: string, image: File): Observable<boolean> {
    return new Observable((observer) => {
      const postData = new FormData();

      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);

      this.httpClient.post('http://localhost:3000/api/posts', postData)
      .subscribe((result: ResultUpdate) => {
        console.log(result.message);

        const post: Post = { id: result.id, title: title, content: content, imagePath: result.imagePath };

        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);

        observer.next(true);
        observer.complete();
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
