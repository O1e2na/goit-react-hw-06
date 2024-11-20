// src/redux/contacts/selectors.js

export const selectContacts = (state) => state.contacts.items;
export const selectStatus = (state) => state.contacts.status;
export const selectError = (state) => state.contacts.error;
