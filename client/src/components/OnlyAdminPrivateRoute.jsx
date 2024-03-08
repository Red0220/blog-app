import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

function OnlyAdminPrivateRoute() {
  const {currentUser} = useSelector((state) => state.user)
  return currentUser && currentUser.isAdmin ? <Outlet/> : 
  <Navigate to ="/signin"/>
}

export default OnlyAdminPrivateRoute