import React, {useState} from 'react';
import { Link} from 'react-router-dom';
import '../../css/navbar.css';



function NavBar2 () {

    return(
        <div className="navBar">
         <ul className="nav nav-underline" style={{marginLeft:"18px",marginRight:"18px"}}>
                <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/onlineP">Pharmacy Management</a>
                </li>
                <li className="nav-item">
                <a className="nav-link"  href="#" style={{color:"black"}}>Prescribed Orders</a>
                </li>
                <li className="nav-item">
                <a className="nav-link"  href="#" style={{color:"black"}}>Dental Management</a>
                </li>
                <li className="nav-item">
                <a className="nav-link"  href="#" style={{color:"black"}}>Consultant App</a>
                </li>
                <li className="nav-item">
                <a className="nav-link"  href="#" style={{color:"black"}}>Laboratory</a>
                </li>
                <li className="nav-item">
                <a className="nav-link"  href="#" style={{color:"black"}}>Health-Blog</a>
                </li>
                <li className="nav-item">
                <a className="nav-link"  href="#" style={{color:"black"}}>Inquiries</a>
                </li>
                <li className="nav-item">
                <a className="nav-link"  href="/" style={{color:"black"}}>back</a>
                </li>
       
          </ul>
        </div>
      
    )
  
   
}


export default NavBar2;