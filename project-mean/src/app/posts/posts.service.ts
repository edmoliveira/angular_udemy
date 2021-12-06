import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';

import { Post } from './post.model';
import { Result } from './result.model';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private httpClient: HttpClient) {

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

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content};

    this.httpClient.post('http://localhost:3000/api/posts', post)
    .subscribe((result: Result) => {
      console.log(result.message);
      this.getPosts();
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
