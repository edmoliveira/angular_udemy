import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../recipe.service';
import { ShoppingService } from '../../shopping-list/shopping.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit { 
  recipe: Recipe;

  constructor(
    private recipeService: RecipeService, 
    private shoppingService: ShoppingService, 
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipe = this.recipeService.getRecipes().find(item => item.id == params["id"]);
    });
  }

  addIngredients() {
    this.shoppingService.pushIngredients(...this.recipe.ingredients);
    this.router.navigate(['/home/shopping-list']);
  }

  delete() {
    this.recipeService.delete(this.recipe.id);
    this.router.navigate(['/home/recipes']);
  }
}
