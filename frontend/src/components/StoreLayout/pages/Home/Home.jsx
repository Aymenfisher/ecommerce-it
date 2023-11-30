import Stack from '@mui/material/Stack'
import React from 'react'
import Description from './Description'
import NewProducts from './NewProducts'
import TopProducts from './TopProducts'
import Categories from './Categories/Categories'
import Services from './Services'
import Brands from './Brands'

const Home = () => {
  return (
    <main>
      <Stack>
        <Description />
        <Services />
        <Categories />
        <NewProducts />
        <Brands />
        <TopProducts />
      </Stack>

    </main>
  )
}

export default Home