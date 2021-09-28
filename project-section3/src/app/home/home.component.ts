import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  errorMessage: string;

  private subscription: Subscription;
 
  constructor(private dataStorageService: DataStorageService) {

  }

  ngOnInit(): void {
    this.subscription = this.dataStorageService.onChangeStatus.subscribe(change => {
      this.isLoading = change.isLoading;
      this.errorMessage = change.errorMessage;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
