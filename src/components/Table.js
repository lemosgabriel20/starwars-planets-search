import React, { useContext } from 'react';
import { nanoid } from 'nanoid';
import PlanetsContex from '../context/PlanetsContext';
import FilterContext from '../context/FilterContext';

export default function Table() {
  const planets = useContext(PlanetsContex);
  const filters = useContext(FilterContext);
  const { name } = filters;
  const { length } = planets;
  if (length) {
    const newPlanets = [...planets];
    const headerKeys = (Object.keys(newPlanets[0]));
    const filteredPlanets = newPlanets.filter((planet) => planet.name.includes(name));
    return (
      <table>
        <thead>
          <tr>
            { headerKeys.map((key) => <th key={ nanoid() }>{ key }</th>) }
          </tr>
        </thead>
        <tbody>
          {
            // caso filtro ativo use filter
            // caso filtro inativo use map
            name === '' ? (
              newPlanets.map((planet) => {
                const planetInfo = Object.values(planet);
                return (
                  <tr key={ nanoid() }>
                    {planetInfo.map((info) => <td key={ nanoid() }>{ info }</td>)}
                  </tr>
                );
              })) : (
              filteredPlanets.map((found) => {
                const planetInfo = Object.values(found);
                return (
                  <tr key={ nanoid() }>
                    {planetInfo.map((info) => <td key={ nanoid() }>{ info }</td>)}
                  </tr>
                );
              })
            )
          }
        </tbody>
      </table>
    );
  }
}
