
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Navbar from './shared/Navbar';
import Products from './container/Products'
import Categories from './container/Categories'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
          <div>
              <Routes>
                  <Route
                    path="/"
                    element={<Home/>}
                  />
                  <Route
                    path="/products"
                    element={<Products/>}
                  />
                  <Route
                    path="/products/:id"
                    element={<Products/>}
                  />
                  <Route
                    path="/categories"
                    element={<Categories/>}
                  />
              </Routes>
          </div>
      </BrowserRouter>
    </>
  );
}

export default App;
