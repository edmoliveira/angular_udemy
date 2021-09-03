import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../recipe.service';
import { ShoppingService } from '../../shopping-list/shopping.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit { 
  recipe: Recipe;

  constructor(private recipeService: RecipeService, private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.recipeService.onSelectedRecipe.subscribe(value =>{
      this.recipe = value;
    })
  }

  addIngredients() {
    this.shoppingService.addIngredient(...this.recipe.ingredients);
  }
}
