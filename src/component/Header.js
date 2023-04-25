import React from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";

import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

const Header = () => {
    const state = useSelector((state) => state);
    return (<>
        <div className="jumbotron">
            <div className="container text-center">
                <h1>Ashlesh Online Store</h1>
            </div>
        </div>
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#"><img src="https://placehold.it/150x20?text=COMPANYLOGO" 
                        className="img-responsive col-lg-12" alt="Image" /></a>
                </div>
                <div className="collapse navbar-collapse" id="myNavbar">
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Link to="/cart" >
                                <span className="glyphicon glyphicon-shopping-cart position-relative"></span> Cart 
                                <span className="badge bg-primary">{!!state.length && state.length}</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>);
};

export default Header;