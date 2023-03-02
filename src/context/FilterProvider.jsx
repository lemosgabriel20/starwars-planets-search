import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FilterContext from './FilterContext';

export default function FilterProvider({ children }) {
  const [filtered, setFiltered] = useState({});
  const [actives, setActives] = useState([]);
  const [columnOp, setColumnOp] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
  const [comparison, setComparison] = useState('');
  const obj = {
    filtered,
    actives,
    columnOp,
    comparison,
    setFiltered,
    setActives,
    setColumnOp,
    setComparison,
  };
  return (
    <FilterContext.Provider value={ obj }>
      <div>{children}</div>
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;
