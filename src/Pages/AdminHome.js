import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import AdminProductList from '../features/admin/AdminProductList'
import Footer from './Footer'

function AdminHome() {
  return (
    <div>
        <Navbar>
            <AdminProductList/>
        </Navbar>
        <Footer/>
    </div>
  )
}

export default AdminHome
