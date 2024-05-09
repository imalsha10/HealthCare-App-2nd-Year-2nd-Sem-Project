import React, {useState} from 'react';
import '../../css/navbar.css';



function NavBar () {

    return(
        <div className="navBar">
         <ul className="nav nav-underline" style={{marginLeft:"18px",marginRight:"18px"}}>
                <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/onlinepharmacyP/land" style={{color:"black"}}>Online-Pharmacy</a>
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
                <a className="nav-link"  href="/dental/dentalHome" style={{color:"black"}}>Dental</a>
                </li>
                <li className="nav-item">
                <a className="nav-link"  href="/dental/dentalGet" style={{color:"black"}}>DA</a>
                </li>
                <li className="nav-item">
                <a className="nav-link"  href="/consultant/doctorview" style={{color:"black"}}>Consultant Care</a>
                </li>
                <li className="nav-item">
                <a className="nav-link"  href="/consultant/add" style={{color:"black"}}>AH</a>
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
                <a className="nav-link"  href="/blog/allblogs" style={{color:"black"}}>Health-Blog</a>
                </li>
                <li className="nav-item">
                <a className="nav-link"  href="/blog/add" style={{color:"black"}}>HB</a>
                </li>
                <li className="nav-item">
                <a className="nav-link"  href="#" style={{color:"black"}}>Inquiries</a>
                </li>
                <li className="nav-item">
                <a className="nav-link"  href="#" style={{color:"black"}}>IQ</a>
                </li>
       
          </ul>
        </div>
      
    )
  
   
}


export default NavBar;