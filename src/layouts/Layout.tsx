import { Outlet } from 'react-router';
import Header from '../components/Header';
import Modal from '../components/Modal';
import { useEffect } from 'react';
import { useAppStore } from '../stores/useAppStore';
import Notification from '../components/Notification';

const Layout = () => {
  const { loadFromLocalStorage } = useAppStore();
  useEffect(() => {
    loadFromLocalStorage();
  }, []);
  return (
    <>
      <Header />
      <main className='container mx-auto py-16'>
        <Outlet />
      </main>
      <Modal />
      <Notification />
    </>
  );
};

export default Layout;
