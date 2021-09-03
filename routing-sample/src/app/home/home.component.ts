import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../userService';
import { User } from '../users/UserModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: User[] = [];

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }

  onLoadServers() {
    this.router.navigate(['/servers']);
  }

  onLoadUser(id: number) {
    this.router.navigate(['/users', id]);
  }

  onEditUser(id: number) {
    this.router.navigate(['/users', id], {queryParams: {mode: 'edit'}, fragment: 'loading'});
  }

  onOpenClient(id: number) {
    this.router.navigate(['/client', id]);
  }
}
