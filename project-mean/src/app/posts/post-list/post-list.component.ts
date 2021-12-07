import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';

import { Post } from "../post.model";
import { PostsService } from "../posts.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postsService: PostsService, private router: Router) {}

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  deletePost(id: string) {
    this.postsService.deletePost(id);
  }

  editPost(id: string){
    this.router.navigate(['/edit/' + id]);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
