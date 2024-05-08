import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,Link ,useNavigate} from "react-router-dom";
import "../../css/AddBlogs.css";

export default function ViewPage() {
  const [viewEvent, setViewEvent] = useState(null);
  const [viewBlog, setViewBlog] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8070/eventh/getevent/${id}`)
      .then((res) => {
        setViewEvent(res.data);
      })
      .catch((err) => {
        console.error("Error fetching event:", err);
      });
  }, [id]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8070/blogh/delete/${id}`)
      .then((res) => {
        
        setViewBlog(null);
        navigate("/");
        

      })
      .catch((err) => {
        console.error('Error deleting blog:', err);
        
        alert(err.message);
      });
  };

  const handleDeleteEvent = (id) => {
    axios
      .delete(`http://localhost:8070/eventh/deleteevent/${id}`)
      .then((res) => {
        
        setViewEvent(null);
        navigate("/blog/allblogs");

      })
      .catch((err) => {
        console.error('Error deleting Event:', err);
        
        alert(err.message);
      });
  };
  

  useEffect(() => {
    axios
      .get(`http://localhost:8070/blogh/get/${id}`)
      .then((res) => {
        setViewBlog(res.data);
      })
      .catch((err) => {
        console.error("Error fetching blog:", err);
      });
  }, [id]);

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-lg-12">
          {viewBlog?.blog ? (
            <div className="card" style={{ margin: "20px 0", padding: "20px" }}>
              {viewBlog.blog.image && (
                <img
                  src={viewBlog.blog.image}
                  alt={viewBlog.blog.blogtitle}
                  className="card-img-top"
                  style={{ objectFit: "cover", height: "300px" }} // Fixed height, with object fit cover to avoid stretching
                />
              )}
              <div className="card-body">
                <h2 className="card-title">{viewBlog.blog.blogtitle}</h2>
                <h5 className="card-subtitle mb-2 text-muted">
                  Author: {viewBlog.blog.authorname}
                </h5>
                <p className="card-text">
                  <small>
                    Date: {new Date(viewBlog.blog.date).toLocaleDateString()}
                  </small>
                </p>
                <p className="card-text">{viewBlog.blog.blogbody}</p>
              </div>
              
              <div  style={{ textAlign: 'center' }}>
              <button
                  className="btn btn-danger mr-2"
                  onClick={() => handleDelete(viewBlog.blog._id)}
                  style={{ display: 'inline-block', marginRight: '10px' }}

                >
                  Delete Blog
                </button>
              <Link to="/blog/allblogs" className="btn btn-primary" style={{ display: 'inline-block', marginRight: '10px' }}>Go to Health Blog</Link>
              </div>
            </div>
          ) : viewEvent?.event ? (
            <div className="card" style={{ margin: "50px 0", padding: "50px" }}>
              {viewEvent.event.image && (
                <img
                  src={viewEvent.event.image}
                  alt={viewEvent.event.eventtitle}
                  className="card-img-top"
                  style={{ objectFit: "cover", height: "300px" }} // Fixed height, with object fit cover to avoid stretching
                />
              )}
              <div className="card-body">
                <h2 className="card-title">
                  {viewEvent.event.eventtitle} - {viewEvent.event.eventcode}
                </h2>
                <h5 className="card-subtitle mb-2 text-muted">
                  Author: {viewEvent.event.eventauthorname}
                </h5>
                <p className="card-text">
                  <small>
                    Date:{" "}
                    {new Date(viewEvent.event.eventdate).toLocaleDateString()}
                  </small>
                </p>
                <p className="card-text">{viewEvent.event.eventbody}</p>
              </div >
              <div style={{ textAlign: 'center' }}>
              <button
                  className="btn btn-danger mr-2"
                  onClick={() => handleDeleteEvent(viewEvent.event._id)}
                  style={{ display: 'inline-block', marginRight: '10px' }}
                >
                  Delete Event
                </button>
                <Link to= {{pathname:`/blog/addcus/${viewEvent.event.eventcode}`}} className="btn btn-success btn-send  pt-2 btn-block" style={{ display: 'inline-block', marginRight: '10px' }}>
                Participate Event
              </Link>
              <Link to="/blog/allblogs" className="btn btn-primary" style={{ display: 'inline-block', marginRight: '10px' }}>Go to Health Blog</Link>
              </div>
            </div>
          ) : (
            <div className="alert alert-info" role="alert">
              Loading data...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}