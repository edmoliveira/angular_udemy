import { ResultService } from "./result-service.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Ingredient } from "../shopping-list/models/ingredient.model";
import { ShoppingService } from "../shopping-list/shopping.service";
import { forkJoin, Subject } from "rxjs";
import { Recipe } from "../recipes/models/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService extends BaseService {
    onChangeStatus: Subject<{isLoading: boolean, errorMessage: string}> = new Subject();
    onSavedData: Subject<void> = new Subject();

    constructor(private http: HttpClient, 
        private shoppingService: ShoppingService,
        private recipeService: RecipeService
        ) {
        super();
    }

    fetchData() {
        this.onChangeStatus.next({isLoading: true, errorMessage: null});

        forkJoin(
            this.http.get<ResultService<Ingredient[]>>("http://localhost:9000/api/ingredients"),
            this.http.get<ResultService<Recipe[]>>("http://localhost:9000/api/recipes"),
        ).subscribe(([ingredientResult, recipeResult]) => {
            let error: string = '';

            this.getResponse<Ingredient[]>(
                ingredientResult, 
                data => this.shoppingService.setIngredients(data),
                errorMessage => {
                    error += errorMessage;
                }
            );

            this.getResponse<Recipe[]>(
                recipeResult, 
                data => this.recipeService.set(data),
                errorMessage => {
                    error += errorMessage;
                }
            );

            this.onChangeStatus.next({
                isLoading: false, 
                errorMessage: (error || '').trim() !== '' ? error : null
            });
        }, 
        error => {
            this.onChangeStatus.next({isLoading: false, errorMessage: this.manageHttpError(error)});
        });
    }

    saveData() {
        this.onChangeStatus.next({isLoading: true, errorMessage: null});

        forkJoin(
            this.http.post<ResultService<Ingredient[]>>(
                "http://localhost:9000/api/ingredients",
                this.shoppingService.getIngredients() 
            ),
            this.http.post<ResultService<Recipe[]>>(
                "http://localhost:9000/api/recipes",
                this.recipeService.getRecipes()
            ),
        ).subscribe(([ingredientResult, recipeResult]) => {
            let error: string = '';

            this.getResponse<Ingredient[]>(
                ingredientResult, 
                data => this.shoppingService.setIngredients(data),
                errorMessage => {
                    error += errorMessage;
                }
            );

            this.getResponse<Recipe[]>(
                recipeResult, 
                data => this.recipeService.set(data),
                errorMessage => {
                    error += errorMessage;
                }
            );

            this.onChangeStatus.next({
                isLoading: false, 
                errorMessage: (error || '').trim() !== '' ? error : null
            });

            this.onSavedData.next();
        }, 
        error => {
            this.onChangeStatus.next({isLoading: false, errorMessage: this.manageHttpError(error)});
        });
    }
}