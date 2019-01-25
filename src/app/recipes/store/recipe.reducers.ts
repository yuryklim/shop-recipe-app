import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as RecipeActions from './recipe.actions';

export interface FeatureState {
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
  
export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
    switch(action.type) {
        case(RecipeActions.SET_RECIPES):
            return {
                ...state,
                recipes: [...action.payload]
            };
        case(RecipeActions.ADD_RECIPE):
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case(RecipeActions.UPDATE_RECIPE):
            const recipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...recipe,
                ...action.payload.updatedRecipe
            };
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updatedRecipe;
            return {
                ...state,
                recipes: recipes
            };
        case(RecipeActions.DELETE_RECIPE):
            const oldRecipes = [...state.recipes];
            oldRecipes.splice(action.payload, 1);
            return {
                ...state,
                recipes: oldRecipes
            };
        default:
            return state;    
    }
}