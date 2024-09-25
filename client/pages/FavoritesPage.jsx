import React from 'react'
import FavoritePlantsContainer from '../containers/FavoritePlantsContainer';

const FavoritesPage = () => {
  return (
    <>
      <h1 className='container'>Favorite Plants</h1>
      <section>
        <FavoritePlantsContainer />
      </section>
    </>
  )
}

export default FavoritesPage