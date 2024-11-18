// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import contactsReducer from './contactsSlice';
import filtersReducer from './filtersSlice';

// Конфігурація для redux-persist
const persistConfig = {
  key: 'contacts',
  storage,
  whitelist: ['items'], // Зберігаємо тільки поле items зі стану контактів
};

// Обгортаємо редюсер контактів у persistReducer
const persistedContactsReducer = persistReducer(persistConfig, contactsReducer);

// Налаштування Redux Store
export const store = configureStore({
  reducer: {
    contacts: persistedContactsReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ігноруємо перевірку серіалізованості для дій redux-persist
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Створення persistor для redux-persist
export const persistor = persistStore(store);
