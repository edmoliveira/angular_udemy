import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from './UserModel';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../userService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  user: User;
  paramsSubscription: Subscription;
  editMode: boolean = false;
  newMode: boolean = false;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    //const id = this.route.snapshot.params["id"];

    //this.user = this.userService.getUsers().find(item => item.id == id);

    this.route.params.subscribe(
      (params: Params) => {
        const id = params["id"];

        this.user = this.userService.getUsers().find(item => item.id == id);

        if(this.user == null){
          this.user = new User(0, '', '', '', null);
          this.newMode = true;
        }
    });

    const mode: string = this.route.snapshot.queryParams["mode"];
    const frag: string = this.route.snapshot.fragment;

    this.editMode = mode === 'edit';
  }

  ngOnDestroy() {
    if(this.paramsSubscription != null) {
      this.paramsSubscription.unsubscribe();
    }
  }

}
