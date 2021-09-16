import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Ingredient } from '../../shopping-list/models/ingredient.model';

@Component({
  selector: 'app-recipe-data',
  templateUrl: './recipe-data.component.html',
  styleUrls: ['./recipe-data.component.css']
})
export class RecipeDataComponent implements OnInit {
  editMode = false;
  formGroup: FormGroup;  

  private id: number = 0;

  constructor(
    private router: Router
    , private route: ActivatedRoute
    , private recipeService: RecipeService) { }

  ngOnInit(): void {
    const regexUrl = /^http(s)?:\/\/(www)?/g;

    this.formGroup = new FormGroup({
      name: new FormControl(null, [Validators.required, this.forbiddenName.bind(this)]),
      description: new FormControl(null, [Validators.required]),
      imagePath: new FormControl(null, [Validators.required, Validators.pattern(regexUrl)]),
      ingredients: new FormArray([])
    });

    this.route.params.subscribe((params: Params) => {
      const recipe:Recipe = this.recipeService.getRecipes().find(item => item.id == params["id"]);

      if(recipe == null){
        this.editMode = false;
      }
      else {
        this.editMode = true;
        this.id = recipe.id;

        this.formGroup.controls.name.setValue(recipe.name);
        this.formGroup.controls.description.setValue(recipe.description);
        this.formGroup.controls.imagePath.setValue(recipe.imagePath);

        recipe.ingredients.forEach(item => {
          this.onAddIngredient(item.name, item.amount);
        });
      }
    });
  }

  onAddIngredient(nameValue: string = null, amountValue: number = null) {
    const ingredientFormGroup = new FormGroup({
      name: new FormControl(nameValue, [Validators.required, this.forbiddenIngredientName.bind(this)]),
      amount: new FormControl(amountValue, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)])
    });

    this.getIngredientsArray().push(ingredientFormGroup);
  }

  onRemoveIngredient(index: number) {
    this.getIngredientsArray().removeAt(index);
  }

  getIngredientsControls(): AbstractControl[] {
    return this.getIngredientsArray().controls;
  }  

  onSubmit() {
    const nameValue = this.formGroup.controls.name.value;
    const descriptionValue = this.formGroup.controls.description.value;
    const imagePathValue = this.formGroup.controls.imagePath.value;

    const ingredients: Ingredient[] = [];

    this.getIngredientsControls().forEach(element => {
      const ingredientFormGroup: FormGroup = <FormGroup>element;

      ingredients.push(new Ingredient(
        ingredientFormGroup.controls.name.value,
        ingredientFormGroup.controls.amount.value
      ));
    });

    if(!this.editMode){
      this.recipeService.add(new Recipe(
        this.recipeService.getNextId(),
        nameValue,
        descriptionValue,
        imagePathValue,
        ingredients
      ));
    }
    else {
      this.recipeService.update(
        this.id,
        nameValue,
        this.formGroup.controls.description.value,
        imagePathValue,
        ingredients
      );
    }
    
    this.router.navigate(['/recipes']);
  }

  onCancel() {
    this.router.navigate(['/recipes']);
  }

  private getIngredientsArray(): FormArray {
    return <FormArray>this.formGroup.controls.ingredients;
  }

  private forbiddenName(control: FormControl): {[s: string]: boolean} {
    if(!this.editMode && this.recipeService.checkIfNameExists(control.value)) {
      return {'nameIfForbidden': true};
    }

    return null;
  }  

  private forbiddenIngredientName(control: FormControl): {[s: string]: boolean} {
    const index = this.getIngredientsControls().findIndex(item => {
      const ingredientFormGroup: FormGroup = <FormGroup>item;
      const nameControl = ingredientFormGroup.controls.name;

      if(nameControl != control && 
        (nameControl.value || '').trim().toLowerCase() === (control.value || '').trim().toLowerCase()){
          return true;
      }
      else {
        return false;
      }
    });

    if(index > -1){
      return {'nameIfForbidden': true};
    }

    return null;
  }    
}
