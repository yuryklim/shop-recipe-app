import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';

export interface FeatureStatue {
    recipes: State
}

export interface State {
    recipes: Recipe[]
  }

  const initialState: State = {
    recipes: [
        new Recipe(
            'Tasty Schnitzel',
            'A super-tasty Schnitzel - just awesome!',
            'https://www.daringgourmet.com/wp-content/' +
            'uploads/2014/03/Schnitzel-7_edited.jpg', 
            [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]),
        new Recipe('Big Fat Burger',
            'What else you need to say?',
            'https://livekindlyproduction-8u6efaq1lwo6x9a.stackpathdns.com/' +
            'wp-content/uploads/2018/08/fatburger-impossible-burger-Cropped-1.jpg', 
            [new Ingredient('Buns', 2), new Ingredient('Meat', 1)])
        ]
    };
  
export function recipeReducer(state = initialState, action) {
    return state;
}