import React, { useContext } from 'react';
import PlanetsContex from '../context/PlanetsContext';

export default function Table() {
  const planets = useContext(PlanetsContex);
  const { length } = planets;
  if (length) {
    const newPlanets = [...planets];
    const headerKeys = (Object.keys(newPlanets[0]));
    return (
      <table>
        <thead>
          <tr>
            { headerKeys.map((key, index) => <th key={ index }>{ key }</th>) }
          </tr>
        </thead>
        <tbody>
          {
            newPlanets.map((planet, index) => {
              const planetInfo = Object.values(planet);
              const indexNp = 5;
              const indexPi = 10;
              return (
                <tr key={ index + indexNp }>
                  { planetInfo.map((info) => <td key={ index + indexPi }>{ info }</td>) }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}
