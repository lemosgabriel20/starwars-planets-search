import React, { useContext } from 'react';
import { nanoid } from 'nanoid';
import FilterContext from '../context/FilterContext';

export default function Table() {
  const { filtered } = useContext(FilterContext);
  const { length } = filtered;
  if (length) {
    const planets = [...filtered];
    const headerKeys = planets[0] ? (Object.keys(planets[0])) : 0;
    return (
      <table>
        <thead>
          <tr>
            {planets[0] ? (
              headerKeys.map((key) => <th key={ nanoid() }>{ key }</th>)) : null}
          </tr>
        </thead>
        <tbody>
          {
            planets.map((found) => {
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

// escrevo no input -> atualiza na hora
// preencho campo de filtros
// clico no botão filtrar -> atualiza
// clico em resetar filtro -> retira os filtros

/*
  Efeito cascata:
    Editei cliquei em filtrar
    Use o editado
    Manter histórico de filtro -> filtrar toda vez novamente ou salvar no filtro
*/
