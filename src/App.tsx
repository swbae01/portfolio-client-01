import Login from "./components/Login";
import Cart from "./components/Cart"
import ProductList from "./components/ProductList"
import Layout from "./components/Layout"
import NewProduct from './components/NewProduct';
import { Routes, Route } from 'react-router-dom';
import { useState } from "react"

function App() {
  const [viewCart, setViewCart] = useState<boolean>(false)

  const pageContent = viewCart ? <Cart /> : <ProductList />

  const content = (
    <Routes>
      <Route path="/" element={<Layout viewCart={viewCart} setViewCart={setViewCart} />}>
        <Route index element={pageContent}></Route> 
        <Route path="login" element={<Login />}></Route>
        <Route path="new" element={<NewProduct />}></Route>
      </Route>
    </Routes>  
  )

  return content
}

export default App