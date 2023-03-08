import React, { useContext } from 'react';
import { nanoid } from 'nanoid';
import FilterContext from '../context/FilterContext';

export default function Table() {
  const { render } = useContext(FilterContext);
  if (render && render[0]) {
    const headers = Object.keys(render[0]);
    return (
      <table>
        <thead>
          <tr>
            {(headers).map((key, i) => <th data-testid="teste" key={ i }>{ key }</th>)}
          </tr>
        </thead>
        <tbody>
          {
            (render).map((planet) => (
              <tr key={ nanoid() }>
                {(headers).map((hd) => (
                  <td
                    key={ nanoid() }
                    data-testid={ (hd === 'name') ? 'planet-name' : null }
                  >
                    { planet[hd] }
                  </td>
                ))}
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}
