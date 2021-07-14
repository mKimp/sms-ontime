import "./App.css";
import Landing from "./component/Landing";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./component/Login";
import Register from "./component/Register";
import AdminPanel from "./component/dashboard/adminpanel";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useState, Fragment, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isVerfied = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/is-verified", {
        method: "POST",
        headers: { token: localStorage.token },
      });
      const parsedRes = await res.json();
      if (parsedRes === true) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    isVerfied();
  }, []);

  return (
    <Fragment>
      <Router>
        <div className='container'>
          <Switch>
            <Route
              exact
              path='/'
              render={(props) =>
                !isAuthenticated ? (
                  <Landing {...props} />
                ) : (
                  <Redirect to='/admin' />
                )
              }
            />

            <Route
              exact
              path='/register'
              render={(props) =>
                !isAuthenticated ? (
                  <Register {...props} setAuth={setIsAuthenticated} />
                ) : (
                  <Redirect to='/admin/' />
                )
              }
            />

            <Route
              exact
              path='/login'
              render={(props) =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setIsAuthenticated} />
                ) : (
                  <Redirect to='/admin/' />
                )
              }
            />

            <Route
              exact
              path='/admin'
              render={(props) =>
                isAuthenticated ? (
                  <AdminPanel {...props} setAuth={setIsAuthenticated} />
                ) : (
                  <Redirect to='/login' />
                )
              }
            />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
