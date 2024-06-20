import axios from 'axios';
import {
  CategoriesAPIResponseSchema,
  DrinksAPIResponseSchema,
  RecipeAPIResponseSchema,
} from '../schemas/recipes';
import type { Drink, SearchFilter } from '../types';

export const getCategories = async () => {
  const { data } = await axios(
    'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
  );

  const result = CategoriesAPIResponseSchema.safeParse(data);
  if (result.success) {
    return result.data;
  }
};

export const getRecipes = async ({ category, ingredient }: SearchFilter) => {
  const { data } = await axios(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}&i=${ingredient}`
  );
  const result = DrinksAPIResponseSchema.safeParse(data);

  if (result.success) {
    return result.data;
  }
};

export const getRecipeDetail = async (id: Drink['idDrink']) => {
  const { data } = await axios(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  const result = RecipeAPIResponseSchema.safeParse(data.drinks[0]);
  if (result.success) {
    return result.data;
  }
};
