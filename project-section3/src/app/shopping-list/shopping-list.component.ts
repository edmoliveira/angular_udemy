import { Component, OnInit } from '@angular/core';
import { Ingredient } from './models/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5)
    ,new Ingredient('Orange', 15)
    ,new Ingredient('Flour', 20)
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onAddedIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
  }
}
