import { Component, OnInit } from '@angular/core';
import { Ingredient } from './models/ingredient.model';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.getIngredients();

    this.shoppingService.onAddedIngredient.subscribe(() =>{
      this.getIngredients();
    });
  }

  private getIngredients() {
    this.ingredients = this.shoppingService.getIngredients();
  }
}
