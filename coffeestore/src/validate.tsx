import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import userStore from './userStore';
import { observer } from 'mobx-react-lite';
import axios from 'axios';

//You need the observer functionality for this sort of "monitoring" to work. 
const Validation = observer(() => {
    console.log("Validate here!");
    //first I just want to check that the user has a token, is set to be logged in (i.e they haven't logged themselves out) AND they have a valid token. 
    //if localStorage.jwtToken is not undefined and is not empty, then we can assume the user was assigned a token. 
    if (localStorage.jwtToken !== undefined && localStorage.jwtToken !== ''){
        userStore.authenticateUser();
    }
    //if they were assigned a token, then userStore needs to be updated to show them as logged in and as authenticated.

    //if they don't have a token, then set them to logged out and authenticated to false. 
  return (

     <nav className="container navbar navbar-expand-lg navbar-light bg-light">{userStore.user && <p>Welcome, {userStore.user}!</p>}
     {userStore.authenticated && <p> You're authenticated according to the userStore.</p>}
     {localStorage.jwtToken !== undefined && localStorage.jwtToken !== '' && (<p>There is some kind of token in local storage.</p>)}
     {userStore.token !== null && userStore.token !== '' && (<p>There is some kind of token assigned in the user store.</p>)}
     {userStore.userRole && <p> Your role is set to {userStore.userRole}</p>}
     </nav>
        
  );
});

export default Validation;