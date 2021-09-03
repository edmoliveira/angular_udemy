import { Component, OnInit } from '@angular/core';
import { AuthenticantionService } from '../authenticaton.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ComponentCanDeactivateGuard } from '../can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, ComponentCanDeactivateGuard {
  constructor(private authenticantionService: AuthenticantionService, private router: Router) { }

  ngOnInit(): void {
  }

  signIn() {
    this.authenticantionService.onState.subscribe(state => {
      if(state) {
        this.router.navigate(['/']);
      }
    });

    this.authenticantionService.login();
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    const isAuthenticated = this.authenticantionService.checkAuthenticated();

    return isAuthenticated;
  }
}
