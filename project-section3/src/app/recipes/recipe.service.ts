import { Injectable } from '@angular/core';
import { Recipe } from './models/recipe.model';
import { Ingredient } from '../shopping-list/models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    onListChange: Subject<boolean> = new Subject();
    private nextId: number = 2;

    private recipes: Recipe[] = [];

    getNextId() {
        this.nextId++;

        return this.nextId;
    }

    getRecipes(){
        return this.recipes.slice();
    }

    add(recipe: Recipe) {
        this.recipes.push(recipe);

        this.onListChange.next(false);
    }

    update(id: number, name: string, description: string, imagePath: string, ingredients: Ingredient[]) {
        const recipe: Recipe = this.recipes.find(item => item.id === id);

        if(recipe != null) {
            recipe.name = name;
            recipe.description = description;
            recipe.imagePath = imagePath;
            recipe.ingredients = ingredients;

            this.onListChange.next(false);
        }
    }

    delete(id: number){
        const index = this.recipes.findIndex(item => item.id === id);

        if(index > -1){
            this.recipes.splice(index, 1);
            this.onListChange.next(false);
        }
    }

    set(recipes: Recipe[]) {
        this.recipes = recipes;
        this.onListChange.next(true);
    }

    checkIfNameExists(name: string){
        return this.recipes.findIndex(item => 
            item.name.trim().toLowerCase() === (name||'').trim().toLowerCase()) !== -1;
    }    
}