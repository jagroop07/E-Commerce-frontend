import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import Products from '../features/Productlist/components/ProductsList'
import Footer from './Footer'

const Home = () => {
  return (
    <>
    <Navbar>
        <Products/>
    </Navbar>
    <Footer/>
    </>
  )
}

export default Home
