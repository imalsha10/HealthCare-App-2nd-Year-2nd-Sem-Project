import React, {useState} from 'react';
import '../../css/navbar.css';



function NavBar () {

    return(
        <div className="navBar">
         <ul className="nav nav-underline" style={{marginLeft:"18px",marginRight:"18px"}}>
                <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/onlinepharmacyP" style={{color:"black"}}>Online-Pharmacy</a>
                </li>
                <li className="nav-item">
                <a className="nav-link"  href="/onlinepharmacy" style={{color:"black"}}>PA</a>
                </li>
                <li className="nav-item">
                <a className="nav-link"  href="/prescribed-m/OrderHome" style={{color:"black"}}>Prescribed Med</a>
                </li>
                <li className="nav-item">
                <a className="nav-link"  href="/prescribed-m/Alluser" style={{color:"black"}}>PM</a>
                </li>
                <li className="nav-item">
                <a className="nav-link"  href="#" style={{color:"black"}}>Dental</a>
                </li>
                <li className="nav-item">
                <a className="nav-link"  href="#" style={{color:"black"}}>DA</a>
                </li>
                <li className="nav-item">
                <a className="nav-link"  href="#" style={{color:"black"}}>Consultant Care</a>
                </li>
                <li className="nav-item">
                <a className="nav-link"  href="#" style={{color:"black"}}>AH</a>
                </li>
                <li className="nav-item">
                <a className="nav-link"  href="#" style={{color:"black"}}>Laboratory</a>
                </li>
                <li className="nav-item">
                <a className="nav-link"  href="#" style={{color:"black"}}>LA</a>
                </li>
                <li className="nav-item">
                <a className="nav-link"  href="#" style={{color:"black"}}>Healthcare Plans</a>
                </li>
                <li className="nav-item">
                <a className="nav-link"  href="/" style={{color:"black"}}>Health-Blog</a>
                </li>
                <li className="nav-item">
                <a className="nav-link"  href="/add" style={{color:"black"}}>HB</a>
                </li>
                <li className="nav-item">
                <a className="nav-link"  href="/inquiry-i/get" style={{color:"black"}}>Inquiries</a>
                </li>
                <li className="nav-item">
                <a className="nav-link"  href="/inquiry-i/add" style={{color:"black"}}>IQ</a>
                </li>
       
          </ul>
        </div>
      
    )
  
   
}


export default NavBar;