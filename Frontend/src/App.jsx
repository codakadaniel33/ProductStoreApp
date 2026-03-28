import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import CreateProducts from './Pages/CreateProducts'
import UpdateProducts from './Pages/UpdateProducts'
import DeleteProduct from './Pages/DeleteProduct'
import AddProduct from './Pages/AddProduct'
import ProductDetails from './Pages/ProductDetails'
import Navbar from './Navigation/Navbar'

function App() {
  
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateProducts />} />
        <Route path="/update" element={<UpdateProducts />} />
        <Route path="/delete" element={<DeleteProduct />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  )
}

export default App
