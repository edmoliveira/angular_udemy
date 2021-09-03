import { Component, OnInit, ElementRef } from '@angular/core';
import { ControlIngredientService } from '../control-ingredient.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private service: ControlIngredientService) { }

  ngOnInit(): void {
  }

  add(elementInput: HTMLInputElement) {
    this.service.addIngredient(elementInput.value);
    elementInput.value = '';
  }
}
