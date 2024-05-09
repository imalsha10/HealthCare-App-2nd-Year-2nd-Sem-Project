import * as React from 'react';


export default function Landing() {

    return(
    <div class="col" style={{marginTop:'30px',marginBottom:'20px'}}>
    <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel" style={{ width: "100%" }}>
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval="2000">
      <img src="/startImage.jpg" className="d-block w-100" alt="Slide 1" style={{ width: "100%", minHeight: "420px", objectFit: "cover" }} />
    </div>
  </div>
    </div>
    </div>
    )

}