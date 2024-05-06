import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



export default function AllBlogs() {
  const [blogs, setblogs] = useState([]);
  const [events, setevents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchEvent, setSearchEvent] = useState("");

  useEffect(() => {
    function getblogs() {
      axios
        .get("http://localhost:8070/blogh/")
        .then((res) => {
          setblogs(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getblogs();
  }, []);

  useEffect(() => {
    function getevents() {
      axios
        .get("http://localhost:8070/eventh/")
        .then((res) => {
          setevents(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getevents();
  }, []);

  function searchBlog(e) {
    setSearchQuery(e.target.value);
  }
  const filteredblogs = blogs.filter((blog) =>
    blog.blogtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function searchevent(e) {
    setSearchEvent(e.target.value);
  }
  const filteredevents = events.filter((event) =>
    event.eventtitle.toLowerCase().includes(searchEvent.toLowerCase())
  );

  return (
    <div style={{ 
      backgroundColor:"#F9FEFF",
      padding: '20px'
     }} >
      

         <div className="second-container text-center">
          <div class="col" style={{backgroundColor:"#000042",height:"80vh"}}>
           <br/><br/><br/><br/><br/><br/>
      <h1 style={{color:"white"}}>Welcome to Our Blog</h1>
      <h3 style={{color:"white", fontStyle:"bold"}}>Curating blogs & events that bring together the greatest minds in
        healthcare,</h3>
      <h3 style={{color:"white"}}>from across the globe, to deliver true innovation. </h3>
      <h5 style={{color:"white"}}>Health News: Latest Research,Trending topics stay up to date with the
        latest medical and health news that matter most to you and your family.</h5>
      <br/>
      <Link to="/" className="btn btn-primary" style={{ color: 'white', fontSize: '20px', borderColor: 'white', backgroundColor: 'transparent' }}>
  Read More
</Link>
<br/>

</div>
         </div>
        <br/>


         <div class="container text-center">
       <div class="row row-cols-2">
    <div class="col">
      <br/>
      <br/>
      <h1 style={{color:"darkblue" ,fontSize: '2.5rem'}}>A Better Future for Health</h1>
      <h3 style={{color:"dodgerblue",fontStyle:"bold"}}>Change Your Habits,Change Your Life</h3>
      <h5 >Achieve your body, health and lifestyle in a Fun, Easy and </h5>
      <h5 >Sustainble Way.</h5>
      <br/>
      <Link to="/" className="btn btn-primary" style={{ color: 'blue', fontSize: '20px', borderColor: 'blue', backgroundColor: 'transparent' }}>
  Explore
</Link>
</div>
    <div class="col">
    <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel" style={{ width: "100%" }}>
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval="10000">
      <img src="https://www.icanotes.com/wp-content/uploads/2023/09/01-How-to-Provide-Culturally-Responsive-Care-in-Mental-Health-Care-1024x512.jpg" className="d-block w-100" alt="Slide 1" style={{ width: "100%", maxHeight: "420px", objectFit: "cover" }} />
    </div>
    <div className="carousel-item" data-bs-interval="2000">
      <img src="https://blogcdn.healthiapp.com/wp-content/uploads/2023/11/5.png" className="d-block w-100" alt="Slide 2" style={{ width: "100%", maxHeight: "420px", objectFit: "cover" }} />
    </div>
    <div className="carousel-item">
      <img src="https://www.healthyspan.in/wp-content/uploads/2021/04/r8-1.png" className="d-block w-100" alt="Slide 3" style={{ width: "100%", maxHeight: "420px", objectFit: "cover" }} />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </div>
   
  </div>
</div>

      
<br />

        
      
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-6">
            <div className="input-group mb-3">
              <input
                type="search"
                placeholder="Search Blog"
                className="form-control"
                value={searchQuery}
                onChange={searchBlog}
                style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="input-group mb-3">
              <input
                type="search"
                placeholder="Search Event"
                className="form-control"
                value={searchEvent}
                onChange={searchevent}
                style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
              />
            </div>
          </div>
        </div>
      </div>

      <br/>

      <div className="container">

      

      <h3 style={{ color:"black", fontFamily: "Arial, sans-serif", fontWeight: "bold", fontSize: "24px" }}>Recent Blog Posts</h3>

      <br/>
      <div className="posts" style={{ display: "flex", flexWrap: "wrap", gap: "35px" }}>
  {filteredblogs.map((blog) => (
    <div className="card" style={{ width: "calc(33.33% - 35px)", borderRadius: "15px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", marginBottom: "35px" }} key={blog._id}>
      <img
        src={blog.image}
        alt="blog"
        className="card-img-top"
        style={{ borderRadius: "15px 15px 0 0", objectFit: "cover", height: "180px", width: "100%" }}
      />
      <div className="card-body">
        <h5>
          <Link
            to={`/get/${blog._id}`}
            style={{ textDecoration: "none", color: "#333" }}
          >
            {blog.blogtitle}
          </Link>
        </h5>
        <p className="authorinfo" style={{ fontSize: "14px", color: "#777" }}>
          <span className="author">by: {blog.authorname}</span>
          <br />
          <time style={{ color: "#999" }}>Created on: {blog.date}</time>
        </p>
        <p className="summary" style={{ fontSize: "14px" }}>{blog.blogsummary}</p>
      </div>
    </div>
  ))}
</div>


<br/>


<h3 style={{ color:"black", fontFamily: "Arial, sans-serif", fontWeight: "bold", fontSize: "24px" }}>Recent Event Posts</h3>
      <br/>

      <div className="events" style={{ display: "flex", flexWrap: "wrap", gap: "35px", marginBottom: "20px" }}>
  {filteredevents.map((event) => (
    <div className="card" style={{ width: "calc(33.33% - 35px)", borderRadius: "15px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", marginBottom: "35px" }} key={event._id}>
      <img
        src={event.image}
        alt="event"
        className="card-img-top"
        style={{ borderRadius: "15px 15px 0 0", objectFit: "cover", height: "180px", width: "100%" }}
      />
      <div className="card-body">
        <h3>
          <Link
            to={`/getevent/${event._id}`}
            style={{ textDecoration: "none", color: "#333" }}
          >
            {event.eventtitle}
          </Link>
        </h3>
        <p style={{ color: "dodgerblue", fontSize: "16px" }}>Event Code: {event.eventcode}</p>
        <p className="authorinfo" style={{ fontSize: "14px", color: "#777" }}>
          <span className="author">by: {event.eventauthorname}</span>
          <br />
          <time style={{ color: "#999" }}>Created on: {event.eventdate}</time>
        </p>
        <p className="summary" style={{ fontSize: "14px" }}>{event.eventsummary}</p>
        <br/>
        <Link to="/addcus" className="btn btn-primary" style={{ color: 'white', fontSize: '14px' }}>
          Participate Event
        </Link>
      </div>
    </div>
  ))}
</div>
</div>

    </div>
  );
}
