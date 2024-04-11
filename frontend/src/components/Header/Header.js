import React from 'react';
import '../../css/header.css';


function Header() {


    return(
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <div className="logo-container">
                    <div className="logo-content">
                        <a className="navbar-brand">
                            <img src="/RatnamLogo.png" alt="Logo"  className="d-inline-block align-text-top"/>
                             <h3>Ratnam Hospital</h3>
                        </a>
                        
                    </div>
                </div>
            </div>
       </nav>
    )
}


export default Header;