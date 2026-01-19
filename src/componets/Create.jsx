import React, { useState } from 'react'
import { Link, useNavigate,} from 'react-router-dom'

export const Create = () => {
    const [values,setValues]=useState({
        firstName:'',
        lastName:'',
        email:'',
        phone:''
    })
      
     const navigate=useNavigate();

      const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const res = await fetch('https://fake-data-3-x6fc.onrender.com/users', {
                method: 'POST',
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
            <h1>Add a User</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" name='firstName' placeholder='Enter firstName' onChange={e=>setValues({...values, firstName: e.target.value})} required />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" name='lastName' placeholder='Enter lastName' onChange={e=>setValues({...values, lastName: e.target.value})} required />
                </div>
                 <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name='email' placeholder='Enter Email' onChange={e=>setValues({...values, email: e.target.value})} required/>
                </div>
                 <div>
                    <label htmlFor="phone">Phone:</label>
                    <input type="text" name='phone' placeholder='Enter Phone' onChange={e=>setValues({...values, phone: e.target.value})} required/>
                </div>
                <button>Submit</button>
                <Link to="/" style={{marginLeft:10}}>Back</Link>
            </form>
        </div>
    </div>
  )
}
