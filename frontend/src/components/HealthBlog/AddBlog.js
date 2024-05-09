import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { handleUpload } from "../HealthBlog/utils/HandleUpload";
import { successMessage } from "../HealthBlog/utils/Alert";
import "../../css/AddBlogs.css";

export default function AddBlog() {
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);

  const [eventImage, setEventImage] = useState("");
  const [eventFile, setEventFile] = useState("");
  const [eventPercent, setEventPercent] = useState(0);

  const [blogtitle, setBlogtitle] = useState("");
  const [authorname, setAuthorname] = useState("");
  const [date, setDate] = useState("");
  const [blogsummary, setBlogSummary] = useState("");
  const [blogbody, setBlogbody] = useState("");

  const [eventcode, setEventcode] = useState("");
  const [eventtitle, setEventtitle] = useState("");
  const [eventauthorname, setEventauthorname] = useState("");
  const [eventdate, setEventdate] = useState("");
  const [eventsummary, setEventSummary] = useState("");
  const [eventbody, setEventbody] = useState("");

  function sendData(e) {
    e.preventDefault();

    if (!image || !blogtitle || !authorname || !date || !blogsummary || !blogbody) {
      alert("Please fill in all required fields.");
      return;
    }


    const newBlog = {
      image,
      blogtitle,
      authorname,
      date,
      blogsummary,
      blogbody,
    };

    axios
      .post("http://localhost:8070/blogh/add", newBlog)
      .then(() => {
        successMessage("Success", "Blog Added");
        // Reset all state values related to the blog form
        setImage("");
        setFile("");
        setPercent(0);
        setBlogtitle("");
        setAuthorname("");
        setDate("");
        setBlogSummary("");
        setBlogbody("");
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  function sendDataevent(e) {
    e.preventDefault();

    if (!eventImage || !eventcode || !eventtitle || !eventauthorname || !eventdate || !eventsummary || !eventbody) {
      alert("Please fill in all required fields.");
      return;
    }

    const newEvent = {
      image: eventImage,
      eventcode,
      eventtitle,
      eventauthorname,
      eventdate,
      eventsummary,
      eventbody,
    };

    axios
      .post("http://localhost:8070/eventh/addevent", newEvent)
      .then(() => {
        successMessage("Success", "Event Added");
        // Reset all state values related to the event form
        setEventcode("");
        setEventtitle("");
        setEventauthorname("");
        setEventdate("");
        setEventSummary("");
        setEventbody("");
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  // Handle blog image upload
  const handleBlogImageUpload = (e) => {
    handleUpload({ file, setPercent, setFunc: setImage });
  };

  // Handle blog image change
  function handleBlogImageChange(event) {
    setFile(event.target.files[0]);
  }

  // Handle event image upload
  const handleEventImageUpload = (e) => {
    handleUpload({
      file: eventFile,
      setPercent: setEventPercent,
      setFunc: setEventImage,
    });
  };

  // Handle event image change
  function handleEventImageChange(event) {
    setEventFile(event.target.files[0]);
  }

  return (
    <div style={{ 
      
      backgroundColor:"#F9FEFF",
     padding: '20px'
      
    }}>
    <div className="container" >
      <header className="mb-4">
      <div className="topic" style={{color:'black'}}>Health Blog</div>
        
        <nav>
          <Link to="/blog/allblogs" style={{ backgroundColor: 'darkblue', color: 'white', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none', marginRight: '10px' }}>Health Blog</Link>
          <Link to="/blog/cus" style={{ backgroundColor: 'darkblue', color: 'white', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none' }}>Participation Details </Link>
          </nav>
      </header>

      
      <br/>

      <div className="row mb-5" >
        <div className="col-md-6" style={{padding: '20px',height: 'fit-content' }} >
          <form className="p-3 border rounded"style={{ backgroundColor: "white", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",height: '100%' }} onSubmit={sendData}>
            
          <div style={{ backgroundColor: "#000042", height: "10vh", width: '100%', marginBottom: '20px', borderRadius: '10px' }}>
                              <br/>
                            <h3 style={{ textAlign: 'center', color: 'white' }}> Add Health Blogs</h3>
                           </div>
                            <br/>

            <div className="form-group">
              <label htmlFor="image"  className="form-label" style={{ fontWeight: '500' }}>Photo</label>
              <input
                type="file"
                className="form-control"
                id="image"
                placeholder="Upload image"
                onChange={handleBlogImageChange}
                required
              />
              <button
                type="button"
                onClick={handleBlogImageUpload}
                disabled={!file || percent === 100}
                className="btn btn-outline-dark mt-2 btn-sm"
              >
                Upload
              </button>
              <div className="progress mt-2">
                <div
                  className={`progress-bar ${
                    percent < 100
                      ? "bg-success progress-bar-striped progress-bar-animated"
                      : "bg-success"
                  }`}
                  role="progressbar"
                  style={{ width: `${percent}%` }}
                  aria-valuenow={percent}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {percent < 100
                    ? `Uploading ${percent}%`
                    : `Uploaded ${percent}%`}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="blogtitle" className="form-label" style={{ fontWeight: '500' }}>Blog Title</label>
              <input
                type="text"
                className="form-control"
                id="blogtitle"
                placeholder="Enter Blog Title"
                onChange={(e) => setBlogtitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="authorname" className="form-label" style={{ fontWeight: '500' }}>Author Name</label>
              <input
                type="text"
                className="form-control"
                id="authorname"
                placeholder="Enter Author name"
                onChange={(e) => setAuthorname(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="date" className="form-label" style={{ fontWeight: '500' }}>Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                placeholder="Enter Date"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="blogsummary" className="form-label" style={{ fontWeight: '500' }}>Summary</label>
              <input
                type="text"
                className="form-control"
                id="blogsummary"
                placeholder="Enter Summary"
                onChange={(e) => setBlogSummary(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="blogbody" className="form-label" style={{ fontWeight: '500' }}>Body</label>
              <textarea
                type="text"
                className="form-control"
                id="blogbody"
                placeholder="Enter Blog "
                onChange={(e) => setBlogbody(e.target.value)}
              />
            </div>
            <br/>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <br/>
            <br/>
          </form>
        </div>

        <div className="col-md-6" style={{  padding: '20px', height: 'fit-content' }}>
          <form className="p-3 border rounded" style={{ backgroundColor: "white", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",height: '100%' }} onSubmit={sendDataevent}>
            
          <div style={{ backgroundColor: "#000042", height: "10vh", width: '100%', marginBottom: '20px', borderRadius: '10px' }}>
                     <br/>
          <h3 style={{ textAlign: 'center', color: 'white' }}>Add Health Events</h3>
          </div>
          <br/>

            <div className="form-group">
              <label htmlFor="image" className="form-label" style={{ fontWeight: '500' }}>Event Image</label>
              <input
                type="file"
                className="form-control"
                id="image"
                placeholder="Upload image"
                onChange={handleEventImageChange}
                required
              />
              <button
                type="button"
                onClick={handleEventImageUpload}
                disabled={!eventFile || eventPercent === 100}
                className="btn btn-outline-dark mt-2 btn-sm"
              >
                Upload
              </button>
              <div className="progress mt-2">
                <div
                  className={`progress-bar ${
                    eventPercent < 100
                      ? "bg-success progress-bar-striped progress-bar-animated"
                      : "bg-success"
                  }`}
                  role="progressbar"
                  style={{ width: `${eventPercent}%` }}
                  aria-valuenow={eventPercent}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {eventPercent < 100
                    ? `Uploading ${eventPercent}%`
                    : `Uploaded ${eventPercent}%`}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="eventcode" className="form-label" style={{ fontWeight: '500' }}>Event Code</label>
              <input
                type="text"
                className="form-control"
                id="eventcode"
                placeholder="Enter Event Code"
                onChange={(e) => setEventcode(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="eventtitle" className="form-label" style={{ fontWeight: '500' }}>Event Title</label>
              <input
                type="text"
                className="form-control"
                id="eventtitle"
                placeholder="Enter Event Title"
                onChange={(e) => setEventtitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="eventauthorname" className="form-label" style={{ fontWeight: '500' }}>Author Name</label>
              <input
                type="text"
                className="form-control"
                id="eventauthorname"
                placeholder="Enter Author name"
                onChange={(e) => setEventauthorname(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="eventdate" className="form-label" style={{ fontWeight: '500' }}>Date</label>
              <input
                type="date"
                className="form-control"
                id="eventdate"
                placeholder="Enter Date"
                onChange={(e) => setEventdate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="eventsummary" className="form-label" style={{ fontWeight: '500' }}>Summary</label>
              <input
                type="text"
                className="form-control"
                id="eventsummary"
                placeholder="Enter Summary"
                onChange={(e) => setEventSummary(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="eventbody" className="form-label" style={{ fontWeight: '500' }}>Body</label>
              <textarea
                type="text"
                className="form-control"
                id="eventbody"
                placeholder="Enter Event"
                onChange={(e) => setEventbody(e.target.value)}
              />
            </div>
            <br/>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}
