import React from 'react';
import Planet from './Planet';
import { useQuery } from 'react-query';

const fetchPlanets = async () =>{
    const res = await fetch('http://swapi.dev/api/planets/');
    return res.json();
}

const Planets = () => {
    // 1st arg- key for the query
    // 2nd arg -function async that is grabbing the data
    const {data, status}= useQuery('planets', fetchPlanets)
    console.log(data)
    return (
    <div>
      <h2>Planets</h2>
      {/* <p>{status}</p> */}
      {status === 'error' && (
          <div>Error fetching data </div>
      )}
      {status === 'loading' && (
          <div>Loading data </div>
      )}
      {status === 'success' && (
          <div>
            {data.results.map(planet =>
                <Planet key={planet.name} planet={planet} />
            )}
          </div>
      )}
    </div>
  );
}
 
export default Planets;