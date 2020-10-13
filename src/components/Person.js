import React from 'react';

const Planet = ({ person }) => {
  return (
    <div className='card'>
      <h2>Name:{ person.name }</h2>
      <p>Gender: { person.gender }</p>
      <p>Birth year: { person.birth_year }</p>
    </div>
  );
}
 
export default Planet;