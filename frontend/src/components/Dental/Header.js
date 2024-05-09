import React, {useState} from "react";

export default function Header (){
    return(
        <div>
            <div className="logo">
                <h1>Ratnam Hospital</h1>
            </div>
            <nav>
                <ul>
                    <li><a href="#">Online Pharmacy</a></li>
                    <li><a href="#">Prescribed-Med</a></li>
                    <li><a href="/dental/dentalHome">Dental</a></li>
                    <li><a href="/dental/dentalServices">Dental 2</a></li>
                    <li><a href="#">Health-Blog</a></li>
                    <li><a href="#">Laboratory</a></li>
                    <li><a href="#">Health Care</a></li>
                    <li><a href="#">Inquiries</a></li>
                </ul>
            </nav>
        </div>
    )
}