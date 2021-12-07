import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { take } from "rxjs";
import { Post } from "../post.model";

import { PostsService } from "../posts.service";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  isEdit: boolean = false;
  isLoading: boolean = false;

  post: Post = { id: '', title: '', content: ''};

  @ViewChild('postForm')
  form: NgForm;

  constructor(public postsService: PostsService
    , private router: Router
    , private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('id')){
        this.isEdit = true;
        this.isLoading = true;

        this.postsService.getPost(paramMap.get('id'))
          .pipe(take(1))
          .subscribe(loadPost => {
            this.isLoading = false;

            if(loadPost != null){
              this.post = loadPost;
            }
            else{
              this.router.navigate(['/']);
            }
          });
      }
    });
  }

  onSubmitPost() {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    if(this.isEdit) {
      this.postsService.updatePost(this.post.id, this.form.value.title, this.form.value.content)
        .pipe(take(1))
        .subscribe(ok => {
          this.isLoading = false;

          if(ok){
            this.form.resetForm();
            this.router.navigate(['/']);
          }
        });
    }
    else {
      this.postsService.addPost(this.form.value.title, this.form.value.content)
        .pipe(take(1))
        .subscribe(ok => {
          this.isLoading = false;

          if(ok){
            this.form.resetForm();
            this.router.navigate(['/']);
          }
        });
    }
  }
}
