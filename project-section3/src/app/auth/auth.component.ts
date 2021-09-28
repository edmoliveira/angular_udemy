import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticantionService } from '../shared/authenticaton.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  errorMessage: string = null;
  unauthorized: boolean = false;

  signupFormGroup: FormGroup;

  private returnPath:string = null;

  constructor(
    private authenticantionService: AuthenticantionService,
    private router: Router,
    private route: ActivatedRoute
  ) { 

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      this.returnPath = queryParams["path"];
    });

    this.signupFormGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });

    this.subscription = this.authenticantionService.onState.subscribe(response => {
      this.signupFormGroup.enable();

      if(response.wasAuthorized) {
        this.signupFormGroup.reset();
        
        if((this.returnPath || '').trim() !== '') {
          this.router.navigate([this.returnPath]);
        }
        else {
          this.router.navigate(['/']);
        }
        
      }
      else if (response.hasError){
        this.errorMessage = response.messagem;
      }
      else {
        this.unauthorized = true;
      }
    });
  }

  onSubmit() {
    this.signupFormGroup.disable();
    this.errorMessage = null;
    this.unauthorized = false;

    this.authenticantionService.login(
      this.signupFormGroup.controls.email.value,
      this.signupFormGroup.controls.password.value
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
