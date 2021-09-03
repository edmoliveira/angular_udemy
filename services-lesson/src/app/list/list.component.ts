import { Component, OnInit } from '@angular/core';
import { ControlIngredientService } from '../control-ingredient.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  ingredients: string[] = [];

  constructor(private service: ControlIngredientService) {
    service.onAddedIngredient.subscribe(value =>{
      this.ingredients.push(value);
    });
   }

  ngOnInit(): void {
  }

}
