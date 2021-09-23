import { ResultService } from "./result-service.model";
import { environment } from 'src/environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Ingredient } from "../shopping-list/models/ingredient.model";
import { ShoppingService } from "../shopping-list/shopping.service";
import { forkJoin, Subject } from "rxjs";
import { Recipe } from "../recipes/models/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    onChangeStatus: Subject<{isLoading: boolean, errorMessage: string}> = new Subject();

    constructor(private http: HttpClient, 
        private shoppingService: ShoppingService,
        private recipeService: RecipeService
        ) {

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
        }, 
        error => {
            this.onChangeStatus.next({isLoading: false, errorMessage: this.manageHttpError(error)});
        });
    }

    private getResponse<T>(
        result: ResultService<T>, 
        onSuccess?: (data: T) => void, 
        onError?: (message: string) => void,
        onFinally?: () => void){
        if(result.success && onSuccess != null) {
            onSuccess(result.data);
        }
        else if(onError != null) {
            onError(result.error);
        }

        if(onFinally != null) {
            onFinally();
        }
    }

    private manageHttpError(error: any): string { 
        if(!environment.production) {
            console.log(error);
        }

        return 'Operation failed: System error. Please contact your system administrator.';
    }
}