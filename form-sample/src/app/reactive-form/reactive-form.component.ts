import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  genders = ['male', 'female'];
  signupFormGroup: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];
  emailDisabled = false;

  constructor() { }

  ngOnInit(): void {
    this.signupFormGroup = new FormGroup({
      'username': new FormControl(null, [Validators.required, this.forbiddenUsers.bind(this)]),
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmail),
      'gender': new FormControl('male'),
      'pass': new FormGroup({
        'password': new FormControl(null, [Validators.required]),
        'repeatPassword': new FormControl(null, [Validators.required]),
      }),
      'hobbies': new FormArray([])
    });

    this.signupFormGroup.get('email').statusChanges.subscribe(status => {
      //console.log(status);
    });

    this.signupFormGroup.patchValue({
      'username': 'superdev'
    });
  }

  onSubmit() {
    console.log(this.signupFormGroup);
    this.signupFormGroup.reset({
      'gender': 'male'
    });
  }

  onAddHobby() {
    this.getHobbiesArray().push(new FormControl(null, [Validators.required]));
  }

  getHobbiesControls(): AbstractControl[] {
    return this.getHobbiesArray().controls;
  }  

  private getHobbiesArray(): FormArray {
    return <FormArray>this.signupFormGroup.get('hobbies');
  }

  private forbiddenUsers(control: FormControl): {[s: string]: boolean} {
    if(this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIfForbidden': true};
    }

    return null;
  }

  private forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'test@test.com') {
          resolve({'emailIfForbidden': true});
        }
        else {
          resolve(null);
        }
      }, 3000);
    });
    
    return promise;
  }
}
