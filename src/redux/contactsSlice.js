// src/redux/contactsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Базова URL для API
const API_URL = '/api/contacts';


// Асинхронна дія для додавання контакту
export const addContact = createAsyncThunk('contacts/addContact', async (contact) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contact),
    mode: 'cors', // Додаємо режим CORS
  });
  return await response.json();
});

// Асинхронна дія для отримання контактів
export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Асинхронна дія для видалення контакту
export const deleteContact = createAsyncThunk('contacts/deleteContact', async (contactId) => {
  await axios.delete(`${API_URL}/${contactId}`);
  return contactId;
});

// Слайс контактів
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    status: 'idle', // idle | loading | succeeded | failed
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter((contact) => contact.id !== action.payload);
      });
  },
});

// Селектор для контактів
export const selectContacts = (state) => state.contacts.items;

// Експорт редюсера за замовчуванням
export default contactsSlice.reducer;
