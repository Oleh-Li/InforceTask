import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { fetchProducts } from './redux/slices/products.js'
import { Home } from './pages/Home'
import { Link, Route, Routes } from 'react-router-dom'
import { Product } from './pages/Product'

function App() {

  return (
    <>
      <Link to="/">
        <h2>Inforce Task</h2>
      </Link>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products/:id' element={<Product />} />
      </Routes>
    </>
  )
}

export default App
