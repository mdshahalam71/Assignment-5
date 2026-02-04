import React, { useEffect, useState } from "react";
import { CiRead } from "react-icons/ci";
import { FaFilter, FaRegEdit } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import { IoMdAddCircle } from "react-icons/io";
import "../assets/css/custom.css";
import "../assets/css/bootstrap.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [displayedContacts, setDisplayedContacts] = useState([]);
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("default");
  const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    async function dataFetch() {
      try {
        const res = await fetch("https://fake-data-3-x6fc.onrender.com/users");
        const fetchedData = await res.json();
        setData(fetchedData);
        setDisplayedContacts(fetchedData);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    dataFetch();
  }, []);

  useEffect(() => {
    if (currentSearchTerm.trim() === "") {
      applyFilter(data, filterType);
      setSearchPerformed(false);
    } else {
      const searchedResults = performSearch(data, currentSearchTerm);
      applyFilter(searchedResults, filterType);
      setSearchPerformed(true);
    }
  }, [data, currentSearchTerm, filterType]);

  const performSearch = (contacts, searchTerm) => {
    const term = searchTerm.toLowerCase().trim();

    return contacts.filter((contact) => {
      if (contact.firstName?.toLowerCase().includes(term)) return true;

      if (contact.lastName?.toLowerCase().includes(term)) return true;

      const fullName =
        `${contact.firstName || ""} ${contact.lastName || ""}`.toLowerCase();
      if (fullName.includes(term)) return true;

      if (contact.email?.toLowerCase().includes(term)) return true;

      if (contact.phone?.toLowerCase().includes(term)) return true;

      return false;
    });
  };

  const handleSearch = (searchTerm) => {
    setCurrentSearchTerm(searchTerm);

    if (searchTerm.trim() === "") {
      setSearchPerformed(false);
    } else {
      setSearchPerformed(true);
    }
  };

  const handleFilterChange = (newFilterType) => {
    setFilterType(newFilterType);

    if (currentSearchTerm.trim() === "") {
      applyFilter(data, newFilterType);
      setSearchPerformed(false);
    } else {
      const searchedResults = performSearch(data, currentSearchTerm);
      applyFilter(searchedResults, newFilterType);
      setSearchPerformed(true);
    }
  };

  const applyFilter = (contactsToFilter, filter) => {
    let sortedContacts = [...contactsToFilter];

    switch (filter) {
      case "fastName-asc":
        sortedContacts.sort((a, b) =>
          (a.firstName || "").localeCompare(b.firstName || ""),
        );
        break;
      case "lastname-asc":
        sortedContacts.sort((a, b) =>
          (a.lastName || "").localeCompare(b.lastName || ""),
        );
        break;
      case "oldest":
        sortedContacts.sort((a, b) => (a.id || 0) - (b.id || 0));
        break;
      default:
        break;
    }

    setDisplayedContacts(sortedContacts);
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(
          `https://fake-data-3-x6fc.onrender.com/users/${id}`,
          {
            method: "DELETE",
          },
        );

        if (response.ok) {
          alert("User deleted successfully!");

          const updatedData = data.filter((user) => user.id !== id);
          setData(updatedData);
        } else {
          alert("Failed to delete user");
        }
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light container sm-w-100">
        <div class="container">
          <Link to="/" class="navbar-brand text-uppercase text-success">
            <strong>
              My Contact App
            </strong>
          </Link>
        </div>
      </nav>
      <main class="py-5">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header card-title bg-primary mb-4">
                  <div class="d-flex align-items-center justify-content-between">
                    <h1>All Contact</h1>
                    <div class="input-group w-50">
                      <SearchBar
                        onSearch={handleSearch}
                        currentSearchTerm={currentSearchTerm}
                      />
                    </div>
                    <Link to="/create" class="btn btn-success">
                      <IoMdAddCircle /> Add
                    </Link>
                  </div>
                </div>

                <div class="d-flex align-items-center justify-content-between px-3">
                  <div class="d-flex align-items-center">
                    <div class="filter-icon"><FaFilter /></div>
                    <h2 >Filter</h2>
                  </div>
                  <div>
                    <FilterDropdown
                      onFilterChange={handleFilterChange}
                      currentFilter={filterType}
                    />
                  </div>
                </div>

                {
                  <div class="card-body">
                    <table class="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">First Name</th>
                          <th scope="col">Last Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Phone</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayedContacts.length > 0 ? (
                          displayedContacts.map((contact, i) => (
                            <tr key={contact.id || i}>
                              <td>{i + 1}</td>
                              <td>{contact.firstName}</td>
                              <td>{contact.lastName}</td>
                              <td>{contact.email}</td>
                              <td>{contact.phone}</td>
                              <td>
                                <Link
                                  to={`/read/${contact.id}`}
                                  class="btn btn-sm btn-circle btn-outline-info"
                                >
                                  <CiRead />
                                </Link>
                                <Link
                                  to={`/update/${contact.id}`}
                                  class="btn btn-sm btn-circle btn-outline-secondary"
                                >
                                  <FaRegEdit />
                                </Link>
                                <Link
                                  onClick={() => deleteUser(contact.id)}
                                  class="btn btn-sm btn-circle btn-outline-danger"
                                >
                                  <ImCross />
                                </Link>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="6"
                              style={{ textAlign: "center", padding: "20px" }}
                            >
                              {searchPerformed ? (
                                <div>
                                  <p>No Contact Information</p>
                                </div>
                              ) : (
                                <p>No contacts available</p>
                              )}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </main>

       <div class="footer text-center bg-body-tertiary container ">
        <p>No More @ back to Home</p>
       </div>
    </>
  );
};

export default Home;
