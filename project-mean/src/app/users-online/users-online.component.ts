import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticantionService } from '../shared/authenticaton.service';
import { UsersOnline } from '../shared/models/users-online';

@Component({
  selector: 'app-users-online',
  templateUrl: './users-online.component.html',
  styleUrls: ['./users-online.component.css']
})
export class UsersOnlineComponent implements OnInit {
  displayedColumns: string[] = ['username', 'online'];
  usersOnlineObs: Observable<UsersOnline[]>;

  constructor(private authenticantionService: AuthenticantionService) { }

  ngOnInit(): void {
    this.usersOnlineObs = this.authenticantionService.usersOnlineObs;
  }

}
