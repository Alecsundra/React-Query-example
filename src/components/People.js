import React from 'react';
import Person from './Person';
import { usePaginatedQuery } from 'react-query';

const fetchPeople = async (key, page) =>{
    const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
    return res.json();
}
const People = () => {
  const [page, setPage] = React.useState(1);
  const {
    //last successuful data fetched
    resolvedData,
    //actual data, not cashed data, new fetch in the bg when change the page
    latestData,
    status
}= usePaginatedQuery(['people',page ], fetchPeople, )
  return (
    <div>
    <h2>People</h2>
    {/* <p>{status}</p> */}
    {status === 'error' && (
        <div>Error fetching data </div>
    )}
    {status === 'loading' && (
        <div>Loading data </div>
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
          {resolvedData.results.map(person =>
              <Person key={person.name} person={person} />
          )}
        </div>
        </>
    )}
  </div>
  );
}
 
export default People;