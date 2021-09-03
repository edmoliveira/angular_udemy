import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingService } from '../shopping.service';

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

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
  }

  add(){
    const nameValue = this.nameInput.nativeElement.value;
    const amountValue = this.amountInput.nativeElement.value;

    this.shoppingService.addIngredient(
      new Ingredient(nameValue, amountValue)
    );

    this.nameInput.nativeElement.value = '';
    this.amountInput.nativeElement.value = '';
  }
}
