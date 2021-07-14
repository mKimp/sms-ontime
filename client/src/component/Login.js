import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Login({ setAuth }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    console.log("HIT CGHANGE");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("HIT SUBMIT");
    try {
      const body = { email, password };
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parsedRes = await res.json();
      if (parsedRes.token) {
        localStorage.setItem("token", parsedRes.token);
        setAuth(true);
        toast.success("Log in successfully");
      } else {
        setAuth(false);
        toast.error(parsedRes);
      }
    } catch (error) {
      console.error("Error in log in");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <input
          className='form-control my-3'
          type='email'
          name='email'
          value={email}
          placeholder='email'
          required
          onChange={onChange}
        ></input>
        <input
          className='form-control my-3'
          type='password'
          name='password'
          value={password}
          placeholder='password'
          required
          onChange={onChange}
        ></input>
        <button className='btn btn-success d-grid gap-2'>Submit</button>
      </form>
      <Link to='/register'>Register</Link>
    </div>
  );
}

export default Login;
