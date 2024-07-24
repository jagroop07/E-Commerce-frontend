import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import AdminProductDetails from '../features/admin/AdminProductDetail'
import Footer from './Footer'

function AdminProductDetailPage() {
  return (
    <div>
      <Navbar>
        <AdminProductDetails/>
      </Navbar>
      <Footer/>
    </div>
  )
}

export default AdminProductDetailPage
