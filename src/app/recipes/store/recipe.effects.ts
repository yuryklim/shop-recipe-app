import {Actions, Effect, ofType} from '@ngrx/effects';
import * as RecipeActions from '../store/recipe.actions';
import {map, switchMap} from 'rxjs/operators';
import {Recipe} from '../recipe.model';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$.pipe(ofType(RecipeActions.FETCH_RECIPES),
    switchMap(
      (action: RecipeActions.FetchRecipes) => {
        return this.httpClient.get<Recipe[]>(
          'https://recipe-book-27421.firebaseio.com/recipes.json',
          {observe: 'body', responseType: 'json'});
      }), map(
      (recipes) => {
        console.log(recipes);
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            console.log(recipe);
            recipe['ingredients'] = [];
          }
        }
        return {
          type: RecipeActions.SET_RECIPES,
          payload: recipes
        };
      }
    ) );

  constructor(private actions$: Actions,
              private httpClient: HttpClient) {
  }
}
