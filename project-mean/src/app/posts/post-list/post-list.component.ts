import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { Observable, take } from 'rxjs';
import { PostAsync } from "../post-async.model";
import { PostsService } from "../posts.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  postResult: Observable<PostAsync>;

  postsPerPage = 5;
  pageIndex = 0;
  pageSizeOptions =  [ 1,2,5,10 ];

  isLoading: boolean = false;

  @ViewChild('paginator')
  paginator: MatPaginator;

  constructor(public postsService: PostsService, private router: Router) {}

  ngOnInit() {
    this.postResult = this.postsService.postResult;

    this.refresh();
  }

  deletePost(id: string) {
    this.postsService.deletePost(id).subscribe(result => {
      if(result.postTotal > 0 && result.pageTotal === 0 && this.pageIndex > 0) {
        this.pageIndex--;

        this.paginator.previousPage();
        this.refresh();
      }
    });
  }

  editPost(id: string){
    this.router.navigate(['/edit/' + id]);
  }

  onChangedPage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.postsPerPage = event.pageSize;

    this.refresh();
  }

  private refresh(){
    this.isLoading = true;

    this.postsService.getPosts(this.postsPerPage, this.pageIndex + 1)
      .pipe(take(1))
      .subscribe(() => {
        this.isLoading = false;
      });
  }

  ngOnDestroy() {

  }
}
