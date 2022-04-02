import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Footer from './components/partials/Footer'
import Header from './components/partials/Header'
import RouteList from './components/RouteList'

export default () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <RouteList />
        <Footer />
      </BrowserRouter>
    </div>
  )
}