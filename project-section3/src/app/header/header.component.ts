import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticantionService } from '../shared/authenticaton.service';
import { DataStorageService } from '../shared/data-storage.service';
import { User } from '../shared/userModel';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  userName: string;
  subscription: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authenticantionService: AuthenticantionService, 
    private router: Router
    ) { }

  ngOnInit(): void {
    this.subscription = this.authenticantionService.getUserData().subscribe((userData: User) => {
      this.userName = userData.name;
    });
  }

  onFetchData() {
     this.dataStorageService.fetchData();
  }

  onSaveData() {
    this.dataStorageService.saveData();
  }

  onLogout() {
    this.authenticantionService.logout();
    this.router.navigate(['/auth']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}