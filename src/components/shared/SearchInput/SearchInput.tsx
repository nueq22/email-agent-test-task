import React from "react";

import styles from "./SearchInput.module.css";

const SearchInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  value,
  onChange,
}) => {
  return (
    <input
      className={styles.input}
      type="search"
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchInput;
