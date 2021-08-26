import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', {static: true})
  nameInput: ElementRef;

  @ViewChild('amountInput', {static: true})
  amountInput: ElementRef;

  @Output()
  addedIngredient: EventEmitter<Ingredient> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  add(){
    const nameValue = this.nameInput.nativeElement.value;
    const amountValue = this.amountInput.nativeElement.value;

    this.addedIngredient.emit(
      new Ingredient(nameValue, amountValue)
    );

    this.nameInput.nativeElement.value = '';
    this.amountInput.nativeElement.value = '';
  }
}
