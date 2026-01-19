import React, { useEffect, useState } from "react";
import { CiRead } from "react-icons/ci";
import { FaFilter, FaRegEdit } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import { IoMdAddCircle } from "react-icons/io";

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
    <div>
      <Link>My Contact App</Link>
      <h1>All Contact</h1>

      <div>
        <SearchBar
          onSearch={handleSearch}
          currentSearchTerm={currentSearchTerm}
        />
      </div>
      <Link to="/create" style={{display:"flex", alignItems:"center"}}><IoMdAddCircle/> New</Link>
      <div style={{display:"flex", alignItems:"center"}}>
          <FaFilter/>
          <h2 style={{margin:2}}>Filter</h2>
        </div>
      <div>
        <FilterDropdown
          onFilterChange={handleFilterChange}
          currentFilter={filterType}
        />
      </div>

      {
        <div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
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
                        style={{ marginRight: "10px" }}
                      >
                        <CiRead />
                      </Link>
                      <Link to={`/update/${contact.id}`}>
                        <FaRegEdit />
                      </Link>
                      <Link onClick={() => deleteUser(contact.id)}>
                        <ImCross />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>
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
  );
};

export default Home;
