import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

function Register({ setAuth }) {
  const [inputs, setInputs] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const { name, phoneNumber, email, password } = inputs;

  const handleonChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value }); //[e.target.name] syntax indicating the dynamic key name in the object
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { name, phoneNumber, email, password };
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await res.json();
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        console.log("Success");
        toast.success("Register Succesfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className='text-center my-5'>Register</h1>

      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label for='exampleInputName'>Name</label>
          <input
            type='text'
            class='form-control'
            id='exampleInputName'
            placeholder='Enter your name'
            name='name'
            value={name}
            required
            onChange={(e) => handleonChange(e)}
          />{" "}
        </div>

        <div className='form-group'>
          <label for='examplePhone'>Phone Number</label>
          <input
            type='tel'
            class='form-control'
            id='examplePhone'
            placeholder='Enter phone number'
            name='phoneNumber'
            value={phoneNumber}
            required
            onChange={(e) => handleonChange(e)}
          />{" "}
        </div>

        <div className='form-group'>
          <label for='exampleInputEmail1'>Email address</label>
          <input
            type='email'
            class='form-control'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
            name='email'
            value={email}
            placeholder='email@gmail.com'
            required
            onChange={(e) => handleonChange(e)}
          />
        </div>

        <div class='form-group'>
          <label for='exampleInputPassword1'>Password</label>
          <input
            type='password'
            class='form-control'
            id='exampleInputPassword1'
            name='password'
            value={password}
            placeholder='Password'
            required
            onChange={(e) => handleonChange(e)}
          />
        </div>
        <button type='submit' class='btn btn-primary'>
          Submit
        </button>
      </form>
      <Link to='/login'>Log in</Link>
    </div>
  );
}

export default Register;
