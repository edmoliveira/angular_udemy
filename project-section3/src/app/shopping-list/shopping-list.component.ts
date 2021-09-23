import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from './models/ingredient.model';
import { ShoppingService } from './shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private subscription: Subscription;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.getIngredients();

    this.subscription = this.shoppingService.onChangedIngredient.subscribe(() =>{
      this.getIngredients();
    });
  }

  onSelected(ingredient: Ingredient) {
    this.shoppingService.selectedIngredient(ingredient);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  private getIngredients() {
    this.ingredients = this.shoppingService.getIngredients();
  }
}