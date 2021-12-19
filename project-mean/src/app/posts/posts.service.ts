import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Observer, Subject } from 'rxjs';
import { PostAsync } from './post-async.model';

import { Post } from './post.model';
import { Result, ResultUpdate } from './result.model';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postTotal: number = 0;
  private postsUpdated = new Subject<void>();

  readonly postResult: Observable<PostAsync>;

  constructor(private httpClient: HttpClient) {
    this.postResult = new Observable(observer => {
      this.postsUpdated.subscribe(() => {
        observer.next({ hasData: this.posts.length > 0, postTotal: this.postTotal, array: [...this.posts] });
      });
    });
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
          imagePath: result.posts.imagePath,
          creator: result.posts.creator
        }
      }))
      .subscribe((postData) => {
        observer.next(postData);
      });
    });
  }

  getPosts(pagesize: number, pageIndex: number): Observable<boolean> {
    return new Observable((observer) => {
      const queryParams = `?pagesize=${pagesize}&page=${pageIndex}`;

      this.httpClient.get<Result>('http://localhost:3000/api/posts' + queryParams)
      .pipe(map(result => {
        console.log(result.message);

        this.postTotal = result.total;

        return result.posts.map(post => {
          return {
            id: post._id,
            title: post.title,
            content: post.content,
            imagePath: post.imagePath,
            creator: post.creator === result.userId
          }
        });
      }))
      .subscribe((postData) => {
        this.posts = postData;
        this.postsUpdated.next();

        observer.next(true);
      });
    });
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
        post = { id: id, title: title, content: content, imagePath: image, creator: null };
      }

      this.httpClient.put('http://localhost:3000/api/posts', post)
      .subscribe((result: ResultUpdate) => {
        console.log(result.message);

        this.postTotal = result.total;

        const index = this.posts.findIndex(c => c.id === id);

        this.posts[index] = { id: id, title: title, content: content, imagePath: result.imagePath, creator: null };
        this.postsUpdated.next();

        observer.next(true);
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

        this.postTotal = result.total;

        const post: Post = { id: result.id, title: title, content: content, imagePath: result.imagePath, creator: null };

        this.posts.push(post);
        this.postsUpdated.next();

        observer.next(true);
      });
    });
  }

  deletePost(id: string): Observable<{ postTotal: number, pageTotal: number }> {
    return new Observable((observer) => {
      this.httpClient.delete('http://localhost:3000/api/posts/' + id)
      .subscribe((result: Result) => {
        console.log(result.message);

        this.postTotal = result.total;

        const index = this.posts.findIndex(c => c.id === id);

        this.posts.splice(index, 1)
        this.postsUpdated.next();

        observer.next({ postTotal: this.postTotal, pageTotal: this.posts.length });
      });
    });
  }
}
