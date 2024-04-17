import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

type LayoutProps = {
  viewCart:boolean,
  setViewCart:React.Dispatch<React.SetStateAction<boolean>>
}

const Layout = ({viewCart, setViewCart}:LayoutProps) => {

  return (
    <>
      <Header viewCart={viewCart} setViewCart={setViewCart} />
      <Outlet />
      <Footer viewCart={viewCart} />
    </>
  )
}

export default Layout