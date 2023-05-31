import { Routes, Route } from "react-router-dom"
import Home from "./home"
import About from "./about"
import Contact from "./contact"
import Shop from "./shop"
import Confirmation from "./confirmation"
import Login from "./login"
import Register from "./register"
import User from "./user"
import 'bootstrap/dist/css/bootstrap.css';
import * as Icon from 'react-bootstrap-icons';
import * as Icon2 from 'react-icons';
import './App.css';
import Validate from "./validate"
import Validation from "./validate"
import Logout from "./logout"
import userStore from "./userStore"
import Admin from "./admin"

//trying to bring in validate broke everything

function shouldActivateValidate() {
  //if the user has a token, but userStore doesn't have a user set
  if (localStorage.jwtToken !== undefined && localStorage.jwtToken !== '' && userStore.user === null) {
    return true;
  }
}

//test 
function App() {

  const activateValidate = shouldActivateValidate();

  return (
    <div className="App totalbackground">
      <User></User>
      <Routes>
      <Route path="/" element={(
            <>
              {activateValidate && <Validate />}
              <Home />
            </>
          )}
        />
         <Route path="about" element={(
            <>
              {activateValidate && <Validate />}
              <About />
            </>
          )}
        />
        <Route path="contact" element={(
            <>
              {activateValidate && <Validate />}
              <Contact/>
            </>
          )}
        />
        <Route path="shop" element={(
            <>
              {activateValidate && <Validate />}
              <Shop />
            </>
          )}
        />
        <Route path="confirmation" element={(
            <>
              {activateValidate && <Validate />}
              <Confirmation/>
            </>
          )}
        />
        <Route path="login" element={(
            <>
              {activateValidate && <Validate />}
              <Login />
            </>
          )}
        />
        <Route path="logout" element={(
            <>
              {activateValidate && <Validate />}
              <Logout />
            </>
          )}
        />
        <Route path="register" element={(
            <>
              {activateValidate && <Validate />}
              <Register />
            </>
          )}
        />
        <Route path="user" element={(
            <>
              {activateValidate && <Validate />}
              <User />
            </>
          )}
        /> 
        <Route path="admin" element={(
            <>
              {activateValidate && <Validate />}
              <Admin/>
            </>
          )}
        /> 
      </Routes>
    
    </div>
  )
}

export default App