import {Recipe} from './recipe.model';

export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('A Test Recipe',
      'This is simply a test',
      'https://hips.hearstapps.com/del.h-cdn.co' +
      '/assets/17/34/2048x1024/landscape-' +
      '1503418862-chicken-thighs-delish.jpg?resize=1200:*'),
    new Recipe('Another Test Recipe',
      'This is simply a test',
      'https://hips.hearstapps.com/del.h-cdn.co' +
      '/assets/17/34/2048x1024/landscape-' +
      '1503418862-chicken-thighs-delish.jpg?resize=1200:*')
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
