import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from './models/ingredient.model';

@Injectable({
    providedIn: 'root'
})
export class ShoppingService {
    onAddedIngredient: EventEmitter<void> = new EventEmitter();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5)
        ,new Ingredient('Orange', 15)
        ,new Ingredient('Flour', 20)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(...ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        this.onAddedIngredient.emit();
    }
}