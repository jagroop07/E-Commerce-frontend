import React from 'react'
import ProductDetails from '../features/Productlist/components/ProductDetails'
import Navbar from '../features/Navbar/Navbar'
import Footer from './Footer'

function ProductDetailsPage() {
  return (
    <div>
      <Navbar>
        <ProductDetails/>
      </Navbar>
      <Footer/>
    </div>
  )
}

export default ProductDetailsPage
