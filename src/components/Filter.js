import React, { useCallback, useContext, useEffect, useState } from 'react';
import FilterContext from '../context/FilterContext';
import PlanetsContex from '../context/PlanetsContext';

export default function Filter() {
  const apiPlanets = useContext(PlanetsContex);
  const { filtered, setFiltered, actives, setActives, columnOp,
    comparison, setComparison, setColumnOp } = useContext(FilterContext);

  const [oneTime, setOneTime] = useState(1);
  const [filterClicked, setFilterClick] = useState(false);
  const [tempActives, setTempActives] = useState('');
  const [isTableLoading, setTableLoading] = useState(true);
  const [firstColItem, setFirstCol] = useState(true);
  const [compValue, setCompValue] = useState(true);
  /* const originalOp = ['population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water']; */
  const { length } = apiPlanets;

  const filterByName = useCallback((evt, nameFilter) => {
    if (length) {
      const planets = [...apiPlanets];
      const result = planets.filter((planet) => {
        const { name } = planet;
        return (name).toLowerCase().includes(nameFilter);
      });
      setFiltered(result);
    }
  }, [apiPlanets, length, setFiltered]);

  const handleFilter = () => {
    setFilterClick(true);
  };

  useEffect(() => {
    if (filterClicked && !actives.includes(tempActives)) {
      setActives([...actives, tempActives]);
      if (comparison === 'maior que') {
        // filtrar
        const result = filtered.filter((planet) => {
          const value = Number(compValue);
          return Number(planet[tempActives]) > value;
        });
        setFiltered(result);
      }
      if (comparison === 'menor que') {
        // filtrar
        const result = filtered.filter((planet) => {
          const value = Number(compValue);
          return Number(planet[tempActives]) < value;
        });
        setFiltered(result);
      }
      if (comparison === 'igual a') {
        const result = filtered.filter((planet) => {
          const value = Number(compValue);
          return Number(planet[tempActives]) === value;
        });
        setFiltered(result);
      }
      const newColumns = columnOp.filter((option) => !actives.includes(option));
      const moreFiltring = newColumns.filter((option) => option !== tempActives);
      setColumnOp(moreFiltring);
      setFilterClick(false);
    }
    if (filterClicked) setTempActives(firstColItem);
  }, [setFilterClick, actives, filterClicked, setActives, tempActives, comparison,
    compValue, setFiltered, filtered, columnOp, setColumnOp, firstColItem]);

  useEffect(() => {
    if (length && oneTime) {
      filterByName({}, '');
      setOneTime(0);
      setComparison('maior que');
      setTempActives('population');
      setCompValue(0);
      setTableLoading(false);
    }
  }, [oneTime, filterByName, length, setTempActives, setComparison]);

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ (evt) => filterByName(evt, evt.target.value) }
      />

      <select
        data-testid="column-filter"
        onChange={ (evt) => {
          setFirstCol(evt.target[0].value);
          console.log(columnOp);
          setTempActives(evt.target.value);
        } }
      >
        { columnOp.includes('population') ? (
          <option value="population">population</option>) : null}
        { columnOp.includes('orbital_period') ? (
          <option value="orbital_period">orbital_period</option>) : null}
        { columnOp.includes('diameter') ? (
          <option value="diameter">diameter</option>) : null}
        { columnOp.includes('rotation_period') ? (
          <option value="rotation_period">rotation_period</option>) : null}
        { columnOp.includes('surface_water') ? (
          <option value="surface_water">surface_water</option>) : null}
        { columnOp.length ? null : <option value="404"> </option>}
      </select>

      <select
        data-testid="comparison-filter"
        onChange={ (evt) => {
          setComparison(evt.target.value);
        } }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        data-testid="value-filter"
        type="number"
        defaultValue="0"
        onChange={ (evt) => setCompValue(evt.target.value) }
      />

      <input
        data-testid="button-filter"
        type="button"
        disabled={ isTableLoading }
        onClick={ () => handleFilter() }
        value="teste"
      />
    </div>
  );
}
