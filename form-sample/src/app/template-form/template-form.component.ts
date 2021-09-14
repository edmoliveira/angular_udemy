import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {
  secretDefaultValue = 'pet';
  answer = '';
  genders = ['male', 'female'];

  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  }

  submitted: boolean = false;

  @ViewChild('f') 
  form: NgForm;

  constructor() {

  }

  ngOnInit() {
    
  }

  /*onSubmit(form: HTMLFormElement) {
    console.log(form)
  }*/

  /*onSubmit(form: NgForm) {
    console.log(form)
  }*/

  suggestUserName() {
    const data = {
      userName: 'superUser',
      email: 'super.user@gmail.com'
    }

    /*this.form.setValue({
      userData: {
        username: data.userName,
        email: data.email
      }, 
      questionAnswer: '',
      gender: 'male',
      secret: 'pet'
    })*/

    this.form.form.patchValue({
      userData: {
        username: data.userName
      }
    });
  }

  onSubmit() {
    this.user.username = this.form.value.userData.username;
    this.user.email = this.form.value.userData.email;
    this.user.secretQuestion = this.form.value.secret;
    this.user.answer = this.form.value.questionAnswer;
    this.user.gender = this.form.value.gender;
    this.submitted = true;

    this.form.reset();
  }
}
