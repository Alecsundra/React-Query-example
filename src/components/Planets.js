import React from 'react';
import Planet from './Planet';
import { usePaginatedQuery } from 'react-query';

const fetchPlanets = async (key, page) =>{

    const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
    return res.json();
}
//query var, pass any data taht we want to use inside the fetch function
//first transform the first arg into an array, the first el will remain the key, second it what you want
//2nd we pass it inside the fetching function as parameters
const Planets = () => {
    const [page, setPage] = React.useState(1);
    //usePaginedQuery hook (better for pagination)

    const {
        //last successuful data fetched
        resolvedData,
        //actual data, not cashed data, new fetch in the bg when change the page
        latestData,
        status
    }= usePaginatedQuery(['planets',page ], fetchPlanets, )


    // 1st arg- key for the query
    // 2nd arg -function async that is grabbing the data
    //useQuery hook
    // const {data, status}= usePaginatedQuery(['planets',page ], fetchPlanets, {
        //stays fresh longer, before refetch stale data (from 0 to 2000)
        // staleTime: 0,
        //by default is using cashed data, seting it in the config, it refetching data everytime you change the page
        // cacheTime: 10,
        //we can use function(as a value) on specific data status fetching, for user notification or other
        // onSuccess: ()=>console.log('data fetched perfectly')
    // })




    console.log(resolvedData)
    return (
    <div>
      <h2>Planets</h2>
     {/* <button onClick ={()=> setPage(1)}>Page 1</button>
     <button onClick ={()=> setPage(2)}>Page 2</button>
     <button onClick ={()=> setPage(3)}>Page 3</button> */}
      {status === 'error' && (
          <div>Error fetching  </div>
      )}
      {status === 'loading' && (
          <div>Loading  </div>
      )}
      {status === 'success' && (
          <>
            <button 
                onClick={()=> setPage(old => Math.max(old -1, 1))}
                disabled={page === 1}
                >Previuos Page
             </button>
            <span>{ page }</span>
            <button
                disabled={!latestData || !latestData.next}
                onClick={()=> setPage(old => (!latestData || !latestData.next ? old : old + 1))}>
                Next Page
            </button>
            <div>
                {resolvedData.results.map(planet =>
                    <Planet key={planet.name} planet={planet} />
                )}
            </div>
          </>
      )}
    </div>
  );
}
 
export default Planets;