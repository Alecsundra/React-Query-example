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
    const {data, status}= useQuery('planets', fetchPlanets, {
        //stays fresh longer, before refetch stale data (from 0 to 2000)
        staleTime: 0,
        //by default is using cashed data, seting it in the config, it refetching data everytime you change the page
        cacheTime: 10,
        //we can use function(as a value) on specific data status fetching, for user notification or other
        onSuccess: ()=>console.log('data fetched perfectly')
    })
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