import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from './shared/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  errorMessage: string;

  private subscription: Subscription;
 
  constructor(private dataStorageService: DataStorageService) {
    this.subscription = dataStorageService.onChangeStatus.subscribe(change => {
      this.isLoading = change.isLoading;
      this.errorMessage = change.errorMessage;
    });
  }

  ngOnInit(): void {
    this.dataStorageService.fetchData();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
