import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
    const state = useSelector((state) => state);
    return (<>
        <div className="jumbotron">
            <div className="container text-center">
                <h1>Ashlesh Online Store</h1>
            </div>
        </div>
        
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Link</a>
                </li>
              </ul>
              <div className="d-flex" role="search">
                 <Link to="/cart" className="cart-text-decoration">
                    <i class="bi bi-cart3"></i> Cart 
                    <span className="badge text-bg-secondary">{!!state.length && state.length}</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>
        
    </>);
};

export default Header;