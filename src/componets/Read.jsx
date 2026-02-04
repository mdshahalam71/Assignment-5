import React, { useEffect, useState } from "react";
import { MdMargin } from "react-icons/md";
import { Link, useParams } from "react-router-dom";

export const Read = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    async function dataFetch() {
      try {
        const res = await fetch(
          "https://fake-data-3-x6fc.onrender.com/users/" + id,
        );
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    dataFetch();
  }, [id]);
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
                  <strong>Detail of User</strong>
                </div>
                <div>
                  <label For="first_name" class="col-md-3 col-form-label">
                    First Name:
                  </label>
                  <div class="col-md-9">
                    <p class="form-control-plaintext text-muted">
                      {data.firstName}
                    </p>
                  </div>
                </div>
                <div>
                  <label For="first_name" class="col-md-3 col-form-label">
                    Last Name:
                  </label>
                  <div class="col-md-9">
                    <p class="form-control-plaintext text-muted">
                      {data.lastName}
                    </p>
                  </div>
                </div>
                <div>
                  <label For="first_name" class="col-md-3 col-form-label">
                    Email
                  </label>
                  <div class="col-md-9">
                    <p class="form-control-plaintext text-muted">
                      {data.email}
                    </p>
                  </div>
                </div>
                <div>
                  <label For="first_name" class="col-md-3 col-form-label">
                    Phone:
                  </label>
                  <div class="col-md-9">
                    <p class="form-control-plaintext text-muted">
                      {data.phone}
                    </p>
                  </div>
                </div>

                <hr />
                <div class="form-group row ">
                  <div class="col-md-9 offset-md-3">
                    <Link to={`/update/${id}`} class="btn btn-info">
                      Edit
                    </Link>
                    <Link></Link>
                    <Link to="/" class="btn btn-outline-secondary">
                      Back
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div class="footer text-center bg-body-tertiary container">
        <p>No More @ back to Home</p>
       </div>
    </>
  );
};
