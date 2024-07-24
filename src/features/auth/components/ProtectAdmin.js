import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectLoggedUserInfo } from '../../User/userSlice'

function ProtectAdmin({children}) {
    const user = useSelector(selectLoggedUserInfo)

    if(!user){
        return <Navigate to='/login' replace={true}></Navigate>
    }
    
    if(user && user.role!=="admin"){
        return <Navigate to='/' replace={true}></Navigate>
    }

    return children
}

export default ProtectAdmin
