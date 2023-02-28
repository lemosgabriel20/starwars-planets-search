import React, { useContext } from 'react';
import FilterContext from '../context/FilterContext';

export default function Filter() {
  const filter = useContext(FilterContext);
  const { setName } = filter;
  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ (evt) => setName(evt.target.value) }
      />
    </div>
  );
}

// escreve no input text
// manda pro context
// atualiza table
