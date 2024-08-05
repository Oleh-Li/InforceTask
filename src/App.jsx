import { useState } from 'react'
import axios from 'axios'
import { } from "react"
import './App.css'

function App() {

  const [products, setProducts] = useState(null)

  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:3000/products')
    console.log("response==>", response)
    return response.data
  }

  fetchProducts()

  return (
    <>
      ff
    </>
  )
}

export default App
