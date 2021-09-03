import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ControlIngredientService {
    onAddedIngredient: EventEmitter<string> = new EventEmitter();

    addIngredient(ingredient: string){
        this.onAddedIngredient.emit(ingredient);
    }
}