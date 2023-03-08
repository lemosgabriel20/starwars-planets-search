import React, { useContext, useEffect, useState } from 'react';
import FilterContext from '../context/FilterContext';
import PlanetsContex from '../context/PlanetsContext';

export default function Filter() {
  const apiPlanets = useContext(PlanetsContex);
  const { setRender } = useContext(FilterContext);
  const [planets, setPlanets] = useState([{ name: '' }]);
  const [filters, setFilters] = useState([]);
  const [order, setOrder] = useState({ column: 'population', sort: 'ASC' });
  const [chosen, setChosen] = useState(
    { column: 'population', comparison: 'maior que', value: 0 },
  );
  const [options, setOptions] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);

  const handleFilter = () => {
    const originalOptions = ['population', 'orbital_period',
      'diameter', 'rotation_period', 'surface_water'];
    const disabledOptions = [];
    const toFilter = [...filters, chosen];
    if (chosen.column) {
      setFilters(toFilter);
      console.log(toFilter);
      let newPlanets = [];
      toFilter.forEach((filter) => {
        newPlanets = (planets.filter((planet) => {
          if (filter.comparison === 'maior que') {
            return Number(planet[filter.column]) > filter.value;
          }
          if (filter.comparison === 'menor que') {
            return Number(planet[filter.column]) < filter.value;
          }
          return Number(planet[filter.column]) === filter.value;
        }));
        setPlanets(newPlanets);
        disabledOptions.push(filter.column);
      });
      setOptions(originalOptions.filter((option) => !disabledOptions.includes(option)));
      setPlanets(newPlanets);
      setRender(newPlanets);
    }
  };
  const removeFilter = (actualFilter) => {
    const originalOptions = ['population', 'orbital_period',
      'diameter', 'rotation_period', 'surface_water'];
    const disabledOptions = [];
    const toFilter = filters.filter((item) => (
      JSON.stringify(item) !== JSON.stringify(actualFilter)));
    console.log(toFilter);
    setFilters(toFilter);
    let newPlanets = apiPlanets;
    toFilter.forEach((filter) => {
      newPlanets = (newPlanets.filter((planet) => {
        if (filter.comparison === 'maior que') {
          return Number(planet[filter.column]) > filter.value;
        }
        if (filter.comparison === 'menor que') {
          return Number(planet[filter.column]) < filter.value;
        }
        if (filter.comparison === 'igual a') {
          return Number(planet[filter.column]) === filter.value;
        }
        return [];
      }));
      setPlanets(newPlanets);
      disabledOptions.push(filter.column);
    });
    setOptions(originalOptions.filter((option) => !disabledOptions.includes(option)));
    setPlanets(newPlanets);
    setRender(newPlanets);
  };

  const removeAllFilters = () => {
    setFilters([]);
    setPlanets(apiPlanets);
    setRender(apiPlanets);
  };

  const orderPlanets = () => {
    const columnVal = [];
    const unknown = [];
    planets.forEach((planet) => {
      if (planet[order.column] === 'unknown') {
        unknown.push('unknown');
        return unknown;
      }
      return columnVal.push((planet[order.column]
      ));
    });
    if (order.sort === 'ASC') columnVal.sort((a, b) => a - b);
    else columnVal.sort((a, b) => b - a);
    if (unknown.length > 0) unknown.forEach(() => columnVal.push('unknown'));
    const newPlanets = [];
    console.log(order);
    columnVal.forEach((val) => {
      const temp = planets.find((planet) => (
        planet[order.column] === val
        && !JSON.stringify(newPlanets).includes(JSON.stringify(planet))
      ));
      newPlanets.push(temp);
    });
    console.log(newPlanets);
    setRender(newPlanets);
  };

  useEffect(() => {
    setChosen({ column: options[0], comparison: 'maior que', value: 0 });
  }, [options]);

  useEffect(() => {
    const { length } = apiPlanets;
    if (length) {
      setPlanets(apiPlanets);
      setRender(apiPlanets);
    }
  }, [apiPlanets, setRender]);

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ (evt) => {
          setRender(planets.filter((planet) => (
            planet.name.toLowerCase().includes(evt.target.value.toLowerCase())
          )));
        } }
      />

      <select
        data-testid="column-filter"
        onChange={ (evt) => setChosen({ ...chosen, column: evt.target.value }) }
      >
        {options.map((option, index) => (
          <option key={ index } value={ option }>{ option }</option>
        ))}
      </select>

      <select
        data-testid="comparison-filter"
        onChange={ (evt) => setChosen({ ...chosen, comparison: evt.target.value }) }
      >
        <option
          value="maior que"
        >
          maior que
        </option>
        <option
          value="menor que"
        >
          menor que
        </option>
        <option
          value="igual a"
        >
          igual a
        </option>
      </select>

      <input
        data-testid="value-filter"
        type="number"
        defaultValue={ 0 }
        onChange={ (evt) => setChosen({ ...chosen, value: Number(evt.target.value) }) }
      />

      <button
        data-testid="button-filter"
        onClick={ () => handleFilter() }
      >
        Filter
      </button>
      <button
        data-testid="button-remove-filters"
        onClick={ () => removeAllFilters() }
      >
        Remove Filters
      </button>
      {
        filters.map((filter, index) => (
          <div key={ index } data-testid="filter">
            {`${filter.column} ${filter.comparison} ${filter.value}`}
            <button
              onClick={ () => removeFilter(filter) }
              data-testid={ `${index}-remove-filter-btn` }
            >
              X
            </button>
          </div>
        ))
      }
      <select
        onChange={ (evt) => setOrder({ ...order, column: evt.target.value }) }
        data-testid="column-sort"
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <label>
        <input
          type="radio"
          name="order"
          value="ASC"
          defaultChecked
          onClick={ () => setOrder({ ...order, sort: 'ASC' }) }
          data-testid="column-sort-input-asc"
        />
        Ascendente
      </label>
      <label>
        <input
          type="radio"
          name="order"
          value="DESC"
          onClick={ () => setOrder({ ...order, sort: 'DESC' }) }
          data-testid="column-sort-input-desc"
        />
        Descendente
      </label>
      <button
        data-testid="column-sort-button"
        onClick={ () => orderPlanets() }
      >
        Ordernar
      </button>
    </div>
  );
}
