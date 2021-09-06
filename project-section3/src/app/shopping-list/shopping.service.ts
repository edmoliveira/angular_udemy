import { Injectable } from '@angular/core';
import { Ingredient } from './models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShoppingService {
    onAddedIngredient: Subject<void> = new Subject();

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
        this.onAddedIngredient.next();
    }
}