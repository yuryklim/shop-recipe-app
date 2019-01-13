import { Component, OnInit } from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe',
      'This is simply a test',
      'https://hips.hearstapps.com/del.h-cdn.co' +
      '/assets/17/34/2048x1024/landscape-' +
      '1503418862-chicken-thighs-delish.jpg?resize=1200:*'),
    new Recipe('A Test Recipe',
      'This is simply a test',
      'https://hips.hearstapps.com/del.h-cdn.co' +
      '/assets/17/34/2048x1024/landscape-' +
      '1503418862-chicken-thighs-delish.jpg?resize=1200:*')
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
