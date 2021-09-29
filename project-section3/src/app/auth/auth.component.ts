import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../alert/alert.component';
import { AuthenticantionService } from '../shared/authenticaton.service';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private closeAlertSubscription: Subscription;

  errorMessage: string = null;
  unauthorized: boolean = false;

  signupFormGroup: FormGroup;

  private returnPath:string = null;

  @ViewChild(PlaceHolderDirective, { static: false })
  alertHost;

  constructor(
    private authenticantionService: AuthenticantionService,
    private router: Router,
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver
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
      if(response.wasAuthorized) {
        this.signupFormGroup.enable();

        this.signupFormGroup.reset();
        
        if((this.returnPath || '').trim() !== '') {
          this.router.navigate([this.returnPath]);
        }
        else {
          this.router.navigate(['/']);
        }
        
      }
      else if (response.hasError){
        this.signupFormGroup.enable();

        this.errorMessage = response.messagem;
      }
      else {
        this.unauthorized = true;
        this.openAlert();
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

  openAlert() {
    const alertFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const viewContainerRef = this.alertHost.viewContainerRef;

    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(alertFactory);

    componentRef.instance.title = 'Authentication Error';
    componentRef.instance.message = 'Incorrect email or password';

    this.closeAlertSubscription = componentRef.instance.onClose.subscribe(() => {
      this.closeAlertSubscription.unsubscribe();
      this.onCloseAlert();
      viewContainerRef.clear();
    })
  }

  onCloseAlert() {
    this.unauthorized = false;
    this.signupFormGroup.enable();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

    if(this.closeAlertSubscription != null) {
      this.closeAlertSubscription.unsubscribe();
    }
  }
}
