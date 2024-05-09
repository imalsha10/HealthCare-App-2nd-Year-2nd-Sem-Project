import React from "react";

function Pharmacydetails(){
    return(

        <div>
            <div id="carouselExampleIndicators" class="carousel slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner"style={{height:"250px",width:"100%"}}>
    <div class="carousel-item active">
      <img src="https://indoreinstitute.com/wp-content/uploads/2021/09/pharmaceutical-industry.jpg" class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="https://globalnews.ca/wp-content/uploads/2022/12/pharmacy-canada-prescription-drugs.jpg?quality=85&strip=all&w=1200" class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="https://assets.aboutamazon.com/dims4/default/c2b8cfb/2147483647/strip/true/crop/2000x1000+0+63/resize/1200x600!/quality/90/?url=https%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2Fa3%2Fc2%2F5c0b93db41d789be1bec015003bd%2Fpharmacy-hero-2000x1125.jpg" class="d-block w-100" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
   <div>

   </div>
   <div style={{color:"" ,marginTop:"100px"}} class="container text-center">
      <div class="row row-cols-2">
        <div class="col"><img src="https://i.pinimg.com/originals/61/b8/f6/61b8f6e014116aca1db6f85be6485203.png" alt="Left Side " style={{ maxWidth: '50%', marginRight: '20px' }} /></div>
        <div class="col"><h1 style={{color:"darkblue" ,fontSize: '2.5rem'}}>WHY PATIENTS CHOOSE US</h1>
          <p>Ratnam Hospital Health employs, consults, and partners with the most dedicated, skilled, and experienced healthcare professionals to offer some of the country's most advanced, evidence based clinical programmes for treating complex diseases, through our Centres of Excellence. We have a sound record for offering outstanding outcomes.
  
  Ratnam Hospital Health also offers treatment for increasingly common lifestyle-based diseases, preventive healthcare, and the most complete menu of diagnostic tests.
  
  Ratnam Health Hospital has international accreditation.</p></div>
      
      </div>
    </div>
    <div class="container text-center">
  <div class="row row-cols-2">
    <div class="col">Column</div>
    <div class="col">Column</div>
    <div class="col">Column</div>
    <div class="col">Column</div>
  </div>
</div>
        </div>

    )

}
export default Pharmacydetails;