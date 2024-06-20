import { useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Search from './Search';

const Header = () => {
  const { pathname } = useLocation();
  const isHome = useMemo(() => pathname === '/', [pathname]);
  return (
    <header
      className={isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800'}
    >
      <div className='mx-auto container px-5 py-16'>
        <div className='flex justify-between items-center'>
          <div>
            <img src='/logo.svg' alt='logo' className='w-32' />
          </div>
          <nav className='flex gap-4'>
            <NavLink
              to={'/'}
              className={({ isActive }) =>
                isActive
                  ? 'font-bold uppercase text-orange-500'
                  : 'font-bold text-white uppercase'
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to={'/favorites'}
              className={({ isActive }) =>
                isActive
                  ? 'font-bold uppercase text-orange-500'
                  : 'font-bold text-white uppercase'
              }
            >
              Favoritos
            </NavLink>
          </nav>
        </div>
        {isHome && <Search />}
      </div>
    </header>
  );
};

export default Header;
