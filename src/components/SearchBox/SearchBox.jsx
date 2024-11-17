// src/components/SearchBox/SearchBox.jsx

import styles from './SearchBox.module.css';

function SearchBox() {
  return (
    <div className={styles.searchBox}>
      <input className={styles.inputSearch} type="text" placeholder="Search contacts..." />
    </div>
  );
}

export default SearchBox;
