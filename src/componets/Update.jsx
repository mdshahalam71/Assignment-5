import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const Update = () => {
  const { id } = useParams();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    async function dataFetch() {
      try {
        const res = await fetch(
          "https://fake-data-3-x6fc.onrender.com/users/" + id,
        );
        const data = await res.json();
        setValues(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    dataFetch();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://fake-data-3-x6fc.onrender.com/users/" + id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        },
      );

      const data = await res.json();
      setValues(data);
      navigate("/");
    } catch (err) {
      console.error("Error creating user:", err);
      alert("Failed to create user. Please try again.");
    }
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light container">
        <div class="container">
          <Link to="/" class="navbar-brand text-uppercase text-success">
            <strong>My Contact App</strong>
          </Link>
        </div>
      </nav>
      <main class="py-5">
        <div class="container">
          <div class="row justify-content-md-center">
            <div class="col-md-8">
              <div class="card">
                <div class="card-header card-title text-success fs-2">
                  <strong>Update a User</strong>
                </div>
                <div class="card-body">
                  <form onSubmit={handleUpdate}>
                    <div class="col-md-12">
                      <div class="form-group row">
                        <label htmlFor="firstName">first Name:</label>
                        <input
                          type="text"
                          name="firstName"
                          placeholder="Enter First Name"
                          value={values.firstName}
                          onChange={(e) =>
                            setValues({ ...values, firstName: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div class="form-group row">
                        <label htmlFor="lastName">last Name:</label>
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Enter Last Name"
                          value={values.lastName}
                          onChange={(e) =>
                            setValues({ ...values, lastName: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div class="form-group row">
                        <label htmlFor="email">Email:</label>
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter Email"
                          value={values.email}
                          onChange={(e) =>
                            setValues({ ...values, email: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div class="form-group row">
                        <label htmlFor="phone">Phone:</label>
                        <input
                          type="text"
                          name="phone"
                          placeholder="Enter Phone"
                          value={values.phone}
                          onChange={(e) =>
                            setValues({ ...values, phone: e.target.value })
                          }
                          required
                        />
                      </div>
                      <hr />
                      <div class="d-flex align-items-center justify-content-between">
                        <button class="btn btn-success">Update</button>
                        <Link to="/" class="btn btn-success">
                          Back
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div class="footer">
        <p>No More @ back to Home</p>
       </div>
    </>
  );
};
