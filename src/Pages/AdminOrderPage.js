import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import AdminOrder from '../features/admin/AdminOrder'
import Footer from './Footer'

function AdminOrderPage() {
  return (
    <div>
      <Navbar>
        <AdminOrder/>
      </Navbar>
      <Footer/>
    </div>
  )
}

export default AdminOrderPage
