import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingService } from '../shopping.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  formGroup: FormGroup;
  isEdit: boolean = false;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl(null, [Validators.required, this.forbiddenName.bind(this)]),
      amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)])
    });

    this.subscription = this.shoppingService.onSelectedIngredient.subscribe((seletecdIngredient: Ingredient) => {
      this.isEdit = true;

      this.formGroup.controls.name.setValue(seletecdIngredient.name);
      this.formGroup.controls.amount.setValue(seletecdIngredient.amount);
    });
  }

  onSubmit(){
    if(!this.isEdit) {
      this.shoppingService.addIngredient(
        new Ingredient(this.formGroup.controls.name.value, this.formGroup.controls.amount.value)
      );
    }
    else{
      this.shoppingService.updateIngredient(
        this.formGroup.controls.name.value,
        this.formGroup.controls.amount.value
      );
    }
    
    this.isEdit = false;
    this.formGroup.reset();
  }

  onDelete() {
    this.shoppingService.deleteIngredient(this.formGroup.controls.name.value);
    this.isEdit = false;
    this.formGroup.reset();
  }

  onClear() {
    this.isEdit = false;
    this.formGroup.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private forbiddenName(control: FormControl): {[s: string]: boolean} {
    if(!this.isEdit && this.shoppingService.checkIfNameExists(control.value)) {
      return {'nameIfForbidden': true};
    }

    return null;
  }
}
