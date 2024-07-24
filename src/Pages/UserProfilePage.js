import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import UserProfile from '../features/User/components/UserProfile'
import Footer from './Footer'

function UserProfilePage() {
  return (
    <div>
      <Navbar>
        <UserProfile/>
      </Navbar>
      <Footer/>
    </div>
  )
}

export default UserProfilePage
