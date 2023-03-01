import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FilterContext from './FilterContext';

export default function FilterProvider({ children }) {
  const [filteredName, setName] = useState('');
  const [filter, isFilterOn] = useState(false);
  const [column, setColumn] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [columnValue, setColumnValue] = useState(0);
  const obj = {
    filteredName,
    filter,
    column,
    operator,
    columnValue,
    setName,
    isFilterOn,
    setColumn,
    setOperator,
    setColumnValue,
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
