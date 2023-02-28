import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FilterContext from './FilterContext';

export default function FilterProvider({ children }) {
  const [name, setName] = useState('');
  return (
    <FilterContext.Provider value={ { name, setName } }>
      <div>{children}</div>
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;
