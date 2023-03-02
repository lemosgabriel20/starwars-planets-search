import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

export default function PlanetProvider({ children }) {
  const [apiPlanets, setApiPlanets] = useState({});
  useEffect(() => {
    const fetchThis = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      const { results } = data;
      const newPlanets = results.map((obj) => {
        delete obj.residents;
        return obj;
      });
      console.log('fetching');
      setApiPlanets(newPlanets);
    };
    fetchThis();
  }, []);
  return (
    <PlanetsContext.Provider value={ apiPlanets }>
      <div>{children}</div>
    </PlanetsContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;
