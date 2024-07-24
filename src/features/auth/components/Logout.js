import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectLoggedUser, signOutAsyc } from '../authSlice'

function Logout() {
    const user = useSelector(selectLoggedUser)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(signOutAsyc())
    },[dispatch])

  return (
    <div>
      {!user && <Navigate to='/login' replace={true}/>}
    </div>
  )
}

export default Logout