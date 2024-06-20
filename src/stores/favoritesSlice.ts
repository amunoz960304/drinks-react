import type { StateCreator } from 'zustand';
import type { Recipe } from '../types';
import { createRecipesSlice, type RecipesSliceType } from './recipeSlice';
import {
  createNotificationSlice,
  type NotificationSliceType,
} from './notificationSlice';

export type FavoritesSliceType = {
  favorites: Recipe[];
  handleClickFavorites: (favorite: Recipe) => void;
  favoriteExist: (id: Recipe['idDrink']) => boolean;
  loadFromLocalStorage: () => void;
};

export const createFavoritesSlice: StateCreator<
  FavoritesSliceType & RecipesSliceType & NotificationSliceType,
  [],
  [],
  FavoritesSliceType
> = (set, get, api) => ({
  favorites: [],
  handleClickFavorites: (recipe) => {
    if (get().favoriteExist(recipe.idDrink)) {
      set({
        favorites: get().favorites.filter(
          (favorite) => favorite.idDrink !== recipe.idDrink
        ),
      });
      createNotificationSlice(set, get, api).showNotification({
        text: 'Se elimino una receta de favoritos',
        error: true,
      });
    } else {
      set({
        favorites: [...get().favorites, recipe],
      });
      createNotificationSlice(set, get, api).showNotification({
        text: 'Se agrego una nueva receta a favoritos',
        error: false,
      });
    }
    createRecipesSlice(set, get, api).closeModal();
    localStorage.setItem('favorites', JSON.stringify(get().favorites));
  },
  favoriteExist: (id) => {
    return get().favorites.some((favorite) => favorite.idDrink === id);
  },
  loadFromLocalStorage: () => {
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
      set({
        favorites: JSON.parse(favorites),
      });
    }
  },
});
