import { lazy, Suspense } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './layouts/Layout';

const AppRouter = () => {
  const IndexPage = lazy(() => import('./views/IndexPage'));
  const FavoritesPage = lazy(() => import('./views/FavoritePage'));
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path='/'
            element={
              <Suspense fallback='Cargando...'>
                <IndexPage />
              </Suspense>
            }
            index
          />
          <Route
            path='/favorites'
            element={
              <Suspense fallback='Cargando...'>
                <FavoritesPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
