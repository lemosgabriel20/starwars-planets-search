import React from 'react';
import PlanetProvider from './context/PlanetProvider';
import FilterProvider from './context/FilterProvider';
import Filter from './components/Filter';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <PlanetProvider>
      <FilterProvider>
        <Filter />
        <Table />
      </FilterProvider>
    </PlanetProvider>
  );
}

export default App;
