import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import AdminProductForm from '../features/admin/AdminProductForm'
import Footer from './Footer'

function AdminProductFormPage() {
  return (
    <div>
      <Navbar>
        <AdminProductForm/>
      </Navbar>
      <Footer/>
    </div>
  )
}

export default AdminProductFormPage
