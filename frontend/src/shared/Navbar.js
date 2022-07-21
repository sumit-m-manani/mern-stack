import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header>
      <div className='container' style={{ display: "flex", width: "100vw", justifyContent:'space-evenly', fontSize: "20px", alignItems:"center" }}>
        <Link to="/" style={{ textDecoration: "none", color: "purple" }}>
          <h1>Product Manager</h1>
        </Link>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems:"center", width:"20rem",fontSize: "12px"}}>
        <Link to="/products" style={{ textDecoration: "none", color: "orange" }}>
          <h1>Products</h1>
        </Link>
        <Link to="/categories" style={{ textDecoration: "none", color: "orange" }}>
          <h1>Categories</h1>
        </Link>
      </div>
    </div>
    </header >
  )
}

export default Navbar