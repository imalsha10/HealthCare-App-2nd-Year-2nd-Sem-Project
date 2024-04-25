import React, { useState, useEffect } from "react";
import { useLabServiceData } from "../../hooks/useLabServiceData";

const index = () => {
  const { data, refetch } = useLabServiceData();
  const [open, setOpen] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);

  // Handle accordion state
  const toggleAccordion = (id) => {
    setOpen(open === id ? null : id);
  };

  // Update the list of services based on the search term and availability
  useEffect(() => {
    if (data?.data?.labServices) {
      const filtered = data.data.labServices.filter(
        (service) =>
          service.available &&
          (service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
      setFilteredServices(filtered);
    }
  }, [searchTerm, data]);

  return (
    <>
      <h1 className="text-center mb-4">Laboratory Services</h1>
      <div className="container">
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search for services..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {filteredServices.map((service) => (
          <div key={service._id} className="card mb-3">
            <div className="card-header">
              <h2 className="mb-0">
                <button
                  className="btn btn-link btn-block text-left"
                  type="button"
                  style={{ textDecoration: "none" }}
                  onClick={() => toggleAccordion(service._id)}
                  aria-expanded={open === service._id}
                  aria-controls={`collapse-${service._id}`}
                >
                  {service.name} (Available)
                </button>
              </h2>
            </div>

            <div
              id={`collapse-${service._id}`}
              className={`collapse ${open === service._id ? "show" : ""}`}
            >
              <div className="card-body">
                <p>{service.description}</p>
                <ul>
                  <li>Duration: {service.duration} minutes</li>
                  <li>Price: Rs.{service.price}/=</li>
                  <li>
                    Preparation Required:{" "}
                    {service.preparationRequired ? "Yes" : "No"}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
        {filteredServices.length === 0 && (
          <div className="text-center">No services found.</div>
        )}
      </div>
    </>
  );
};

export default index;
