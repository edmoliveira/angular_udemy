import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthenticantionService } from '../shared/authenticaton.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  formGroup: FormGroup;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private authenticantionService: AuthenticantionService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    this.formGroup.disable();
    this.isLoading = true;

    const username = this.formGroup.controls.username.value;
    const password = this.formGroup.controls.password.value;

    this.authenticantionService.login(username, password)
      .pipe(take(1))
      .subscribe(result => {
        this.formGroup.enable();
        this.isLoading = false;

        if(result.wasAuthenticated) {
          this.router.navigate(['/home']);
        }
        else {
          this.formGroup.reset();

          this.snackBar.open(result.errorMessage, 'Close', {
            duration: 3000
          });
        }
      });
  }

  formEnter(button: MatButton){
    if(this.formGroup.valid) {
      button._elementRef.nativeElement.click();
    }
  }
}
