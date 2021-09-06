import { Component, OnInit, Output } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.fillRecipes();

    this.recipeService.onListChange.subscribe(() => {
      this.fillRecipes();
    });
  }

  fillRecipes() {
    this.recipes = this.recipeService.getRecipes();
  }
}
