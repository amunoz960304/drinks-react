import { useEffect, useState, type FormEvent } from 'react';
import { useAppStore } from '../stores/useAppStore';
import type { SearchFilter } from '../types';

const Search = () => {
  const { fetchCategories, categories, fetchRecipes, showNotification } =
    useAppStore();

  const [filters, setFilters] = useState<SearchFilter>({
    category: '',
    ingredient: '',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(filters).includes('')) {
      showNotification({
        error: true,
        text: 'Todos los campos son obligatoros',
      });
      return;
    }

    fetchRecipes(filters);

    setFilters({
      category: '',
      ingredient: '',
    });
  };

  return (
    <form
      className='md:w-1/2 xl:w-1/3 my-32 p-10 rounded-lg bg-orange-400 shadow space-y-6'
      onSubmit={handleSubmit}
    >
      <div className='space-y-4'>
        <label
          htmlFor='ingredients'
          className='block text-white uppercase font-extrabold text-lg'
        >
          Nombre o Ingrediente
        </label>
        <input
          type='text'
          id='ingredients'
          placeholder='Nombre de la bebida o Ingrediente'
          className='p-3 w-full rounded-lg focus:outline-none'
          value={filters.ingredient}
          onChange={(e) =>
            setFilters({ ...filters, ingredient: e.target.value })
          }
        />
      </div>
      <div className='space-y-4'>
        <label
          htmlFor='category'
          className='block text-white uppercase font-extrabold text-lg'
        >
          Categoria
        </label>
        <select
          id='category'
          className='p-3 w-full rounded-lg focus:outline-none'
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value={''}>-- Selecciona una categoria --</option>
          {categories.drinks.map(({ strCategory }) => (
            <option key={strCategory} value={strCategory}>
              {strCategory}
            </option>
          ))}
        </select>
      </div>
      <input
        type='submit'
        value='Buscar Recetas'
        className='cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold p-2 w-full rounded-lg uppercase'
      />
    </form>
  );
};

export default Search;
