import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-data',
  templateUrl: './recipe-data.component.html',
  styleUrls: ['./recipe-data.component.css']
})
export class RecipeDataComponent implements OnInit {
  recipe: Recipe;
  editMode = false;

  constructor(
    private router: Router
    , private route: ActivatedRoute
    , private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const recipes = this.recipeService.getRecipes();

      this.recipe = recipes.find(item => item.id == params["id"]);

      if(this.recipe == null){
        this.editMode = false;
        this.recipe = new Recipe(0, '', '', '', []);
      }
      else {
        this.editMode = true;
      }
    });
  }

  add() {
    this.recipe.id = this.recipeService.getNextId();
    
    this.recipeService.add(this.recipe);
    this.router.navigate(['/recipes']);
  }
}
