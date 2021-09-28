import { Injectable } from '@angular/core';
import { Ingredient } from './models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShoppingService {
    onChangedIngredient: Subject<boolean> = new Subject();
    onSelectedIngredient: Subject<Ingredient> = new Subject();

    private ingredients: Ingredient[] = [];

    selectedIngredient(ingredient: Ingredient) {
        this.onSelectedIngredient.next(ingredient);
    }

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.onChangedIngredient.next(false);
    }

    updateIngredient(nameSearch: string, name: string, amount: number) {
        const ingredient: Ingredient = this.ingredients.find(item => 
            item.name.trim().toLowerCase() === (nameSearch||'').trim().toLowerCase());

        if(ingredient != null) {
            ingredient.name = name;
            ingredient.amount = amount;
            this.onChangedIngredient.next(false);
        }
    }

    deleteIngredient(name: string) {
        const index = this.ingredients.findIndex(item => 
            item.name.trim().toLowerCase() === (name||'').trim().toLowerCase());

        if(index > -1) {
            this.ingredients.splice(index, 1);
            this.onChangedIngredient.next(false);
        }
    }

    pushIngredients(...ingredients: Ingredient[]){
        ingredients.forEach(itemPush => {
            const ingredient: Ingredient = this.ingredients.find(item => 
                item.name.trim().toLowerCase() === itemPush.name.trim().toLowerCase());

            if(ingredient != null) {
                ingredient.amount += itemPush.amount;
            }            
            else {
                this.ingredients.push(itemPush);
            }
        });
        
        this.onChangedIngredient.next(false);
    }

    setIngredients(ingredients: Ingredient[]) {
        this.ingredients = ingredients;
        this.onChangedIngredient.next(true);
    }

    checkIfNameExists(name: string){
        return this.ingredients.findIndex(item => 
            item.name.trim().toLowerCase() === (name||'').trim().toLowerCase()) !== -1;
    }
}