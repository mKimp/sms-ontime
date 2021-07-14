import React from "react";
import { Jumbotron, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
function Landing() {
  return (
    <Jumbotron style={{ margin: "50px" }}>
      <h1>Welcome to sms-ontime city!</h1>
      <p className='lead'>
        This is a simple text message app, a simple sms scheduler for creating
        and sending message on your designated time.
      </p>
      <p>Sign in to start scheduling and sending your messages.</p>
      <Link to='/login' className='btn btn-primary'>
        Login
      </Link>
      <Link to='/register' className='btn btn-primary ml-3'>
        Register
      </Link>
    </Jumbotron>
  );
}

export default Landing;
