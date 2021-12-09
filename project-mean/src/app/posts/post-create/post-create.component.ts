import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { take } from "rxjs";

import { PostsService } from "../posts.service";
import { mimeTypeValidator } from "./mime-type.validator";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {
  id: string;
  isEdit: boolean = false;
  isLoading: boolean = false;
  isImageLoading: boolean = false;
  imagePreview: string;

  postFormGroup: FormGroup;

  constructor(public postsService: PostsService
    , private router: Router
    , private route: ActivatedRoute) {}

  ngOnInit() {
    this.postFormGroup = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required], [mimeTypeValidator])
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('id')){
        this.isEdit = true;
        this.isLoading = true;

        this.postsService.getPost(paramMap.get('id'))
          .pipe(take(1))
          .subscribe(loadPost => {
            this.isLoading = false;

            if(loadPost != null){
              this.id = loadPost.id;
              this.postFormGroup.setValue({
                title: loadPost.title,
                content: loadPost.content,
                image: loadPost.imagePath
              });

              this.imagePreview = loadPost.imagePath;
            }
            else{
              this.router.navigate(['/']);
            }
          });
      }
    });
  }

  onImagePicked(event: Event) {
    this.isImageLoading = true;

    const file = (event.target as HTMLInputElement).files[0];
    this.postFormGroup.patchValue({
      image: file
    });
    this.postFormGroup.controls.image.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.isImageLoading = false;
    };
    reader.readAsDataURL(file);
  }

  onSubmitPost() {
    if (this.postFormGroup.invalid) {
      return;
    }

    this.isLoading = true;

    if(this.isEdit) {
      this.postsService.updatePost(
        this.id,
        this.postFormGroup.controls.title.value,
        this.postFormGroup.controls.content.value,
        this.postFormGroup.controls.image.value
      )
        .pipe(take(1))
        .subscribe(ok => {
          this.isLoading = false;

          if(ok){
            this.postFormGroup.reset();
            this.router.navigate(['/']);
          }
        });
    }
    else {
      this.postsService.addPost(
        this.postFormGroup.controls.title.value,
        this.postFormGroup.controls.content.value,
        this.postFormGroup.controls.image.value
      )
        .pipe(take(1))
        .subscribe(ok => {
          this.isLoading = false;

          if(ok){
            this.postFormGroup.reset();
            this.router.navigate(['/']);
          }
        });
    }
  }
}
