import React from 'react';
import PlanetProvider from './context/PlanetProvider';
import FilterProvider from './context/FilterProvider';
import Filter from './components/Filter';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <FilterProvider>
      <PlanetProvider>
        <Filter />
        <Table />
      </PlanetProvider>
    </FilterProvider>
  );
}

export default App;
