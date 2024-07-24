import React from 'react'
import { selectLoggedUser } from '../authSlice'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Protected({children}) {
    const user = useSelector(selectLoggedUser)

    if(!user){
        return <Navigate to='/login' replace={true}></Navigate>
    }

  return children
}

export default Protected
