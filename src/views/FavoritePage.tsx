import { useMemo } from 'react';
import DrinkCard from '../components/DrinkCard';
import { useAppStore } from '../stores/useAppStore';

const FavoritePage = () => {
  const { favorites } = useAppStore();
  const hasFavorites = useMemo(() => favorites.length > 0, [favorites]);
  return (
    <>
      <h1 className='text-6xl font-extrabold'>Favoritos</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 gap-10'>
        {hasFavorites ? (
          favorites.map((favorite) => (
            <DrinkCard key={favorite.idDrink} drink={favorite} />
          ))
        ) : (
          <p className='my-10 text-center text-2xl'>
            Los favoritos se mostrarán aquí
          </p>
        )}
      </div>
    </>
  );
};

export default FavoritePage;
