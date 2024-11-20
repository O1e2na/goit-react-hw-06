// src/components/ContactsForm/ContactsForm.jsx

import { useDispatch } from 'react-redux';
import { addContactThunk } from '../../redux/contactsSlice'; // Виправлено ім'я для асинхронної операції додавання контакту
import styles from './ContactForm.module.css';

const ContactsForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = {
      name: e.target.elements.name.value,
      number: e.target.elements.number.value,
    };
    dispatch(addContactThunk(newContact));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        required
        className={styles.input}
      />
      <input
        type="text"
        name="number"
        placeholder="Phone Number"
        required
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Add Contact
      </button>
    </form>
  );
};

export default ContactsForm;
