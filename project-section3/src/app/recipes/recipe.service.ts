import { Injectable } from '@angular/core';
import { Recipe } from './models/recipe.model';
import { Ingredient } from '../shopping-list/models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    onListChange: Subject<void> = new Subject();
    private nextId: number = 2;

    private recipes: Recipe[] = [
        new Recipe(
        1
        ,'A test recipe'
        ,'This is simply a test' 
        ,'https://img.itdg.com.br/tdg/images/recipes/000/062/547/318292/318292_original.jpg'
        ,[
            new Ingredient('Egg', 5)
            , new Ingredient('Milk', 1)
        ]
        )
        , new Recipe(
            2            
            ,'A test recipe 2'
            , 'This is simply a test 2'
            , 'https://www.comidaereceitas.com.br/img/sizeswp/1200x675/2019/09/torta_chocolate_amargo.jpg'
            ,[
                new Ingredient('Egg', 5)
                , new Ingredient('Milk', 1)
            ]
        )
    ];

    getNextId() {
        this.nextId++;

        return this.nextId;
    }

    getRecipes(){
        return this.recipes.slice();
    }

    add(recipe: Recipe) {
        this.recipes.push(recipe);

        this.onListChange.next();
    }

    update(id: number, name: string, description: string, imagePath: string, ingredients: Ingredient[]) {
        const recipe: Recipe = this.recipes.find(item => item.id === id);

        if(recipe != null) {
            recipe.name = name;
            recipe.description = description;
            recipe.imagePath = imagePath;
            recipe.ingredients = ingredients;

            this.onListChange.next();
        }
    }

    delete(id: number){
        const index = this.recipes.findIndex(item => item.id === id);

        if(index > 0){
            this.recipes.splice(index, 1);
            this.onListChange.next();
        }
    }

    checkIfNameExists(name: string){
        return this.recipes.findIndex(item => 
            item.name.trim().toLowerCase() === (name||'').trim().toLowerCase()) !== -1;
    }    
}