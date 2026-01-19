import React, { useEffect, useState } from 'react'
import { MdMargin } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';

export const Read = () => {
   const [data,setData]=useState([])
   const {id}=useParams()
   useEffect(() => {
    async function dataFetch(){
      try {
        const res = await fetch('https://fake-data-3-x6fc.onrender.com/users/'+ id);
        const data = await res.json();
        setData(data); 
      } catch (error) {
        console.error('Error:', error);
      }
    }
    
    dataFetch();
  },[id]);
  return (
    <div>
      <div>
        <h3>Detail of User</h3>
        <div>
          <strong>First Name:{data.firstName}</strong>
        </div>
        <div>
          <strong>Last Name:{data.lastName}</strong>
        </div>
        <div>
          <strong>Email:{data.email}</strong>
        </div>
        <div>
          <strong>Phone:{data.phone}</strong>
        </div>
        <Link to={`/update/${id}`} style={{ marginRight: "50px" }}>Edit</Link>
        <Link to="/">Back</Link>
      </div>
    </div>
  )
}
