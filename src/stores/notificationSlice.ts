import type { StateCreator } from 'zustand';
import type { FavoritesSliceType } from './favoritesSlice';

export type Notification = {
  text: string;
  error: boolean;
  show: boolean;
};
export type NotificationSliceType = {
  notification: Notification;
  showNotification: (payload: Pick<Notification, 'error' | 'text'>) => void;
  closeNotification: () => void;
};

export const createNotificationSlice: StateCreator<
  NotificationSliceType & FavoritesSliceType,
  [],
  [],
  NotificationSliceType
> = (set, get) => ({
  notification: {
    text: '',
    error: false,
    show: false,
  },
  showNotification: ({ text, error }) => {
    set({
      notification: {
        show: true,
        text,
        error,
      },
    });

    setTimeout(() => {
      get().closeNotification();
    }, 5000);
  },
  closeNotification: () => {
    set({
      notification: {
        text: '',
        show: false,
        error: false,
      },
    });
  },
});
