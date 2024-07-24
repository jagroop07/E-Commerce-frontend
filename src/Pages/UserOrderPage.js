import React from 'react'
import UserOrder from '../features/User/components/UserOrder'
import Navbar from '../features/Navbar/Navbar'
import Footer from './Footer'

function UserOrderPage() {
  return (
    <div>
      <Navbar>
        <UserOrder/>
      </Navbar>
      <Footer/>
    </div>
  )
}

export default UserOrderPage
