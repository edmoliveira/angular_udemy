import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AppDropdownDirective } from "../shared/dropdown.directive";
import { RecipeDataComponent } from "./recipe-data/recipe-data.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipesComponent } from "./recipes.component";

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeDataComponent,
        AppDropdownDirective
    ]
    , imports: [
        RouterModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
      ] 
    , exports: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeDataComponent,
        AppDropdownDirective,
    ]
})
export class RecipesModule {

}