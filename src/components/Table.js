import React, { useContext } from 'react';
import { nanoid } from 'nanoid';
import PlanetsContex from '../context/PlanetsContext';
import FilterContext from '../context/FilterContext';

export default function Table() {
  const planets = useContext(PlanetsContex);
  const filters = useContext(FilterContext);
  const { filteredName, column, operator, columnValue } = filters; // chamar filtros aqui
  const { filter } = filters;
  const { length } = planets;
  if (length) {
    const newPlanets = [...planets];
    const headerKeys = (Object.keys(newPlanets[0]));
    let filteredPlanets = [];
    if (filter) {
      filteredPlanets = newPlanets.filter((planet) => {
        const { name } = planet;
        const asEval = Function;
        let symOp = '';
        if (operator === 'maior que') symOp = '>';
        if (operator === 'menor que') symOp = '<';
        if (operator === 'igual a') symOp = '==';
        const operation = `${Number(planet[column])}${symOp}${columnValue}`;
        const operationResult = asEval(`return ${operation}`)();
        return name.includes(filteredName)
        && operationResult;
      });
      console.log('Com filtro');
    } else {
      filteredPlanets = newPlanets.filter((planet) => planet.name.includes(filteredName));
      console.log('Sem filtro');
    }
    return (
      <table>
        <thead>
          <tr>
            { headerKeys.map((key) => <th key={ nanoid() }>{ key }</th>) }
          </tr>
        </thead>
        <tbody>
          {
            filteredPlanets.map((found) => {
              const planetInfo = Object.values(found);
              return (
                <tr key={ nanoid() }>
                  {planetInfo.map((info) => <td key={ nanoid() }>{ info }</td>)}
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}
