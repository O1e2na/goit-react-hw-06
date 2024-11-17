// src/components/ContactsForm/ContactsForm.jsx

import PropTypes from 'prop-types';
import styles from './ContactsForm.module.css';

function ContactForm({ onAddContact }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.elements.name.value.trim();
    const number = form.elements.number.value.trim();

    if (name && number) {
      onAddContact({ name, number });
      form.reset();
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        name="name"
        placeholder="Name"
        required
      />
      <input
        className={styles.input}
        type="text"
        name="number"
        placeholder="Phone Number"
        required
      />
      <button className={styles.button} type="submit">
        Add Contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};

export default ContactForm;
