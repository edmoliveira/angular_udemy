import { Injectable } from '@angular/core';
import { Ingredient } from './models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShoppingService {
    onChangedIngredient: Subject<void> = new Subject();
    onSelectedIngredient: Subject<Ingredient> = new Subject();

    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 5)
        ,new Ingredient('Orange', 15)
        ,new Ingredient('Flour', 20)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(...ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        this.onChangedIngredient.next();
    }

    selectedIngredient(ingredient: Ingredient) {
        this.onSelectedIngredient.next(ingredient);
    }

    updateIngredient(name: string, amount: number) {
        const ingredient: Ingredient = this.ingredients.find(item => 
            item.name.trim().toLowerCase() === (name||'').trim().toLowerCase());

        if(ingredient != null) {
            ingredient.amount = amount;
            this.onChangedIngredient.next();
        }
    }

    deleteIngredient(name: string) {
        const index = this.ingredients.findIndex(item => 
            item.name.trim().toLowerCase() === (name||'').trim().toLowerCase());

        if(index > -1) {
            this.ingredients.splice(index, 1);
            this.onChangedIngredient.next();
        }
    }

    checkIfNameExists(name: string){
        return this.ingredients.findIndex(item => 
            item.name.trim().toLowerCase() === (name||'').trim().toLowerCase()) !== -1;
    }
}