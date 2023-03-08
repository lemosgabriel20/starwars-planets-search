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

export default { fetchThis };
