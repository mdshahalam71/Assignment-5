import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export const Update = () => {
   const {id}=useParams()
   const [values,setValues]=useState({
           firstName:'',
           lastName:'',
           email:'',
           phone:''
       })
       
       const navigate=useNavigate()
          useEffect(() => {
           async function dataFetch(){
             try {
               const res = await fetch('https://fake-data-3-x6fc.onrender.com/users/'+ id);
               const data = await res.json();
                setValues(data)
             } catch (error) {
               console.error('Error:', error);
             }
           }
           
           dataFetch();
         },[id]);
   
   const handleUpdate = async (e) => {
        e.preventDefault();
        
        try {
            const res = await fetch('https://fake-data-3-x6fc.onrender.com/users/'+ id,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            });
            
            const data = await res.json();
            setValues(data)
            navigate('/');
            
        } catch (err) {
            console.error('Error creating user:', err);
            alert('Failed to create user. Please try again.');
        }
    };

  return (
    <div>
      <div>
            <h1>Update a User</h1>
            <form onSubmit={handleUpdate}>
                <div>
                    <label htmlFor="firstName">first Name:</label>
                    <input type="text" name='firstName' placeholder='Enter First Name'value={values.firstName}
                     onChange={e=>setValues({...values, firstName: e.target.value})}   required />
                </div>
                <div>
                    <label htmlFor="lastName">last Name:</label>
                    <input type="text" name='lastName' placeholder='Enter Last Name'value={values.lastName}
                     onChange={e=>setValues({...values, lastName: e.target.value})}   required />
                </div>
                 <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name='email' placeholder='Enter Email'value={values.email}
                     onChange={e=>setValues({...values, email: e.target.value})}  required/>
                </div>
                 <div>
                    <label htmlFor="phone">Phone:</label>
                    <input type="text" name='phone' placeholder='Enter Phone'value={values.phone}
                     onChange={e=>setValues({...values, phone: e.target.value})} required/>
                </div>
                <button style={{marginRight:10}}>Update</button>
                <Link to="/">Back</Link>
            </form>
        </div>
    </div>
  )
}
