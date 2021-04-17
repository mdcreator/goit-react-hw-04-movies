import { useState } from 'react';
import PropTyps from 'prop-types';
import s from './Searchbar.module.css';

// import { toast } from 'react-toastify';
// import { render } from '@testing-library/react';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');
  //   state = {
  //     query: '',
  //   };

  const handleInputChange = ({ target }) => {
    setQuery(target.value);
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    onSubmit(query);
    setQuery('');

    // this.reset();
  };

  //   reset = () => {
  //     this.setState({ query: '' });
  //   };

  //   render() {
  return (
    <div className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleOnSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>
        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          name="query"
          value={query}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
// }

Searchbar.propTyps = {
  onSubmit: PropTyps.func.isRequired,
};
