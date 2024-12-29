import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Productos from '../containers/Productos'
import Materiales from '../containers/Materiales'
import EditMaterial from '../containers/EditMaterial'
import EditProductos from '../containers/EditProductos'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Productos />} />
          <Route path="/materiales" element={<Materiales />} />
          <Route path="/editarMaterial/:id" element={<EditMaterial />} />
          <Route path="/editarProducto/:id" element={<EditProductos />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
