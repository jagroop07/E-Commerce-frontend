import React from 'react'
import Cart from '../features/cart/Cart'
import Navbar from '../features/Navbar/Navbar'
import Footer from './Footer'


function CartPage() {
  return (
    <div>
       <Navbar>
          <Cart/>
       </Navbar>
       <Footer/>
    </div>
  )
}

export default CartPage
