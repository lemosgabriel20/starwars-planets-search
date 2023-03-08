import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FilterContext from './FilterContext';

export default function FilterProvider({ children }) {
  const [render, setRender] = useState();
  return (
    <FilterContext.Provider value={ { render, setRender } }>
      <div>{children}</div>
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;
