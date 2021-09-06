import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeDataComponent } from './recipes/recipe-data/recipe-data.component';

const appRoutes = [
    { path: '',  redirectTo: '/recipes', pathMatch: 'full' }
    ,{ path: 'recipes', component: RecipesComponent, children: 
        [
            { path: 'new', component: RecipeDataComponent }
            , { path: ':id', component: RecipeDetailComponent }
            , { path: ':id/edit', component: RecipeDataComponent }
        ] 
    }
    , { path: 'shopping-list', component: ShoppingListComponent }
    , { path: 'not-found', component: NotFoundComponent, data: { message: 'PAGE NOT FOUND'} }
    , { path: '**', redirectTo: '/not-found', pathMatch: 'full' }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ]
    , exports: [RouterModule]
})
export class AppRoutingModule {

}