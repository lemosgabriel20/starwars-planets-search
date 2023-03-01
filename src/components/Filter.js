import React, { useContext } from 'react';
import FilterContext from '../context/FilterContext';

export default function Filter() {
  const filter = useContext(FilterContext);
  const { setName, isFilterOn, setColumn, setOperator, setColumnValue } = filter;
  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ (evt) => setName(evt.target.value) }
      />
      <select
        data-testid="column-filter"
        defaultValue="population"
        onChange={ (evt) => setColumn(evt.target.value) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        defaultValue="maior que"
        onChange={ (evt) => setOperator(evt.target.value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        defaultValue={ 0 }
        onChange={ (evt) => setColumnValue(evt.target.value) }
      />
      <input
        data-testid="button-filter"
        type="button"
        value="FILTRAR"
        onClick={ () => isFilterOn(true) }
      />
      <input
        type="button"
        value="REMOVER FILTRO"
        onClick={ () => isFilterOn(false) }
      />
    </div>
  );
}

// escreve no input text
// manda pro context
// atualiza table
