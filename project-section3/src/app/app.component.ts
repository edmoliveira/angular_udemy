import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeService } from './recipes/recipe.service';
import { DataStorageService } from './shared/data-storage.service';
import { ShoppingService } from './shopping-list/shopping.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy  {
  private hasChanged: boolean = false;
  private changedIngredientSubscription: Subscription;
  private changedRecipeSubscription: Subscription;
  private savedDataSubscription: Subscription;

  constructor(
      private shoppingService: ShoppingService,
      private recipeService: RecipeService,
      private dataStorageService: DataStorageService
    ) {
    
  }

  ngOnInit(): void {
    this.changedIngredientSubscription = this.shoppingService.onChangedIngredient.subscribe(fetched => {
      if(!fetched) {
        this.hasChanged = true;
      }
    });

    this.changedRecipeSubscription = this.recipeService.onListChange.subscribe(fetched => {
      if(!fetched) {
        this.hasChanged = true;
      }
    });

    this.savedDataSubscription = this.dataStorageService.onSavedData.subscribe(() => {
      this.hasChanged = false;
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    if(this.hasChanged) {
      window.opener.location.reload();
    }
  }

  ngOnDestroy() {
    this.changedIngredientSubscription.unsubscribe();
    this.changedRecipeSubscription.unsubscribe();
    this.savedDataSubscription.unsubscribe();
  }
}
