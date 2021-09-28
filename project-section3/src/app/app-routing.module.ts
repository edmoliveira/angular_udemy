import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeDataComponent } from './recipes/recipe-data/recipe-data.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { AuthGuard } from './shared/auth-guard.service';

const appRoutes = [
    { path: '',  redirectTo: '/home', pathMatch: 'full' }
    , { path: 'home',  component: HomeComponent, children: [
                {path: '', component: WelcomeComponent}
                , { path: 'recipes', component: RecipesComponent, children: 
                [
                    { path: 'new', component: RecipeDataComponent }
                    , { path: ':id', component: RecipeDetailComponent }
                    , { path: ':id/edit', component: RecipeDataComponent }
                ] ,
                canActivateChild: [AuthGuard]
            }
            , { path: 'shopping-list', component: ShoppingListComponent }
        ] ,
        canActivate: [AuthGuard], canActivateChild: [AuthGuard]
    }
    , { path: 'auth', component: AuthComponent }
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