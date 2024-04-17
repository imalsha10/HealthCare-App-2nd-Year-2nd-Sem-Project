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
    <div className="container">
      <header>
        <div className="topic">Health Blog</div>
        <nav>
          <Link to="/add">Create Blog or Event</Link>
          <a href="">Logout</a>
        </nav>
      </header>

      <h1>A Better Future for Health</h1>
      <h2>
        Curating blogs & events that bring together the greatest minds in
        healthcare, from across the globe, to deliver true innovation.
      </h2>

      <img
        src="https://blog.mission-health.org/wp-content/uploads/sites/2/2019/06/fresh-ideas-for-weight-loss_my-healthy-life.jpg"
        alt="banner"
        style={{ width: "100%", height: "75vh" }}
      />

      <div className="main-second-line">
        Health News: Latest Research, , Trending Topics Stay up to date with the
        latest medical and health news that matter most to you and your family.
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

      <div className="posts mt-3">
        <h3>Blogs</h3>
        {filteredblogs.map((blog) => (
          <div className="post" key={blog._id}>
            <div className="image">
              <img
                src={blog.image}
                alt="blog"
                className="img-fluid"
                style={{
                  width: "100%",
                  height: "200px", // Set a fixed height
                  objectFit: "cover", // Ensure the image covers the area without stretching
                  borderRadius: "10px",
                }}
              />
            </div>
            <div className="texts">
              <h3>
                <Link
                  to={`/get/${blog._id}`}
                  style={{ textDecoration: "underline" }}
                >
                  {blog.blogtitle}
                </Link>
              </h3>
              <p className="authorinfo">
                <span className="author">by:{blog.authorname}</span>
                <time>Created on:{blog.date}</time>
              </p>
              <p className="summary">{blog.blogsummary}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="events">
      <h3>Events</h3>
        {filteredevents.map((event) => (
          <div className="post" key={event._id}>
            <div className="image">
              
              <img
                src={event.image}
                alt="blog"
                className="img-fluid"
                style={{
                  width: "100%",
                  height: "200px", // Set a fixed height
                  objectFit: "cover", // Ensure the image covers the area without stretching
                  borderRadius: "10px",
                }}
              />
            </div>
            <div className="texts">
              <h3>
                <Link
                  to={`/getevent/${event._id}`}
                  style={{ textDecoration: "underline" }}
                >
                  {event.eventtitle}
                </Link>
              </h3>
              <p>{event.eventcode}</p>
              <p className="authorinfo">
                <span className="author">by:{event.eventauthorname}</span>

                <time>Created on:{event.eventdate}</time>
              </p>
              <p className="summary">{event.eventsummary}</p>

              <Link to="/addcus" className="btn btn-primary">
                Participate Event
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
