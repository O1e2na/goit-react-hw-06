// src/redux/contactsSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact as addContactThunk, deleteContact as deleteContactThunk } from './operations';

const initialState = {
  items: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContactSync(state, action) {
      state.items.push(action.payload);
    },
    deleteContactSync(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addContactThunk.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContactThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

// Правильний експорт асинхронних операцій
export const { addContactSync, deleteContactSync } = contactsSlice.actions;
export const selectContacts = (state) => state.contacts.items;
export const selectStatus = (state) => state.contacts.status;
export const selectError = (state) => state.contacts.error;

export default contactsSlice.reducer;
