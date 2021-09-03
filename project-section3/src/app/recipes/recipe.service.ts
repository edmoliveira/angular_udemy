import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './models/recipe.model';
import { Ingredient } from '../shopping-list/models/ingredient.model';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    onSelectedRecipe: EventEmitter<Recipe> = new EventEmitter();

    private recipes: Recipe[] = [
        new Recipe('A test recipe'
        ,'This is simply a test' 
        ,'https://www.simplyrecipes.com/thmb/OCi18J2V8OeKDFV3FxoeKvgq74E=/1423x1067/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2012__07__grilled-sweet-potatoes-horiz-a-1600-7c8292daa98e4020b447f0dc97a45cb7.jpg'
        ,[
            new Ingredient('Egg', 5)
            , new Ingredient('Milk', 1)
        ]
        )
        , new Recipe(
            'A test recipe 2'
            , 'This is simply a test 2'
            , 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/easy-cheap-dinners-weeknight-1604466210.jpg?crop=0.502xw:1.00xh;0.498xw,0&resize=640:*'
            ,[
                new Ingredient('Egg', 5)
                , new Ingredient('Milk', 1)
            ]
        )
    ];

    getRecipes(){
        return this.recipes.slice();
    }
}