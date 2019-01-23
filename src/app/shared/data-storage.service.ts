import {Injectable} from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {map} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    /*const header = new HttpHeaders().set('Authorization', 'Bearer adfafafa');*/
    /*return this.httpClient.put(
      'https://recipe-book-27421.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(),
      {
        observe: 'body',
        params: new HttpParams().set('auth', token)
        /!*headers: header*!/});*/
    const req = new HttpRequest(
      'PUT',
      'https://recipe-book-27421.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(),
      {reportProgress: true});
        return this.httpClient.request(req);
  }

  getRecipes() {
    /*this.httpClient.get<Recipe[]>('https://recipe-book-27421.firebaseio.com/recipes.json?auth=' + token).pipe(map(*/
    this.httpClient.get<Recipe[]>(
      'https://recipe-book-27421.firebaseio.com/recipes.json',
      {observe: 'body', responseType: 'json'})
      .pipe(map(
      (recipes) => {
        console.log(recipes);
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            console.log(recipe);
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      }
    ))
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
