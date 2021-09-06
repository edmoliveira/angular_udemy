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
  subscription: Subscription;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.getIngredients();

    this.subscription = this.shoppingService.onAddedIngredient.subscribe(() =>{
      this.getIngredients();
    });
  }

  private getIngredients() {
    this.ingredients = this.shoppingService.getIngredients();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
