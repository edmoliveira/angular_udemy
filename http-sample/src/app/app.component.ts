import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Result } from './resultModel';
import { ResponseModel } from './reponseModel';
import { NgForm } from '@angular/forms';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Result[] = [];
  isFetching:boolean = false;
  isPosting:boolean = false;
  error = null;

  @ViewChild('postForm') 
  form: NgForm | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.isPosting  =true;
    this.error = null;

    this.http.post("http://localhost:8080/api/contents", postData, {observe: 'response'})//, 
    .pipe(map(response => {
      console.log(response);
      return <ResponseModel> response.body;
    }))    
    .subscribe(response => {
      this.loadedPosts = response.data;
      this.isPosting = false;
      this.form?.reset();
    }, 
    error => {
      this.isPosting = false;
      this.error = error.message;
    });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    this.error = null;

    this.http.delete("http://localhost:8080/api/contents")
    .pipe(map(response => {
      return <ResponseModel> response;
    }))    
    .subscribe(response => {
      this.loadedPosts = response.data;
    }, 
    error => {
      this.error = error.message;
    });
  
    /*console.log('ok');
    this.http.delete("http://localhost:8080/api/contents", {observe: 'events'})  
    .pipe(tap(
      event => {
        console.log(event);
      }
    ));  */

  }

  private fetchPosts() {
    this.isFetching = true;
    this.error = null;

    this.http.get("http://localhost:8080/api/contents", {
      headers: new HttpHeaders({"Custom-Header": "Hello"}),
      params: new HttpParams().set('print', 'pretty')
    })
    .pipe(map(response => {
      return <ResponseModel> response;
    }), 
      catchError(errorResponse => {
        return throwError(errorResponse);
      })
    )
    .subscribe(response => {
      this.loadedPosts = response.data;
      this.isFetching = false;
    }, 
    error => {
      this.isFetching = false;
      this.error = error.message;
    });
  }
}
