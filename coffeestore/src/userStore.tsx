import { makeObservable, makeAutoObservable, observable, action } from 'mobx';
import axios from 'axios';

class UserStore {
  user: string | null = null;
  authenticated: boolean = false;
  userRole: string | null = null;
  token: string | null = null;

  constructor() {
    makeAutoObservable(this, {
      user: observable,
      authenticated: observable,
      userRole: observable,
      authenticateUser: action,
      token: observable,
      setToken: action,
      setUserInitial: action,
      setUserSubsequent: action,
      clearUser: action,
    });
  }

  setToken = action((token: string) => {
    this.token = token;
  }
  );

  
  setUserInitial = action((user: string) => {
    this.user = user;
  }
  );
  //really this is doing a kind of cleanup after authenticateUser is done, but whatever
  setUserSubsequent = action((confirmedUserName: string): string | null => {
    if (confirmedUserName) {
      this.user = confirmedUserName;
      this.authenticated = true;
      this.token = localStorage.jwtToken;
      return confirmedUserName;
    } else {
      this.user = null;
      this.authenticated = false;
      return null;
    }
  });

  setUserRole = action((convertedUserRole: string): string | null => {
    if (convertedUserRole === "admin") {
      this.userRole = "admin";
    } else {
      this.userRole = convertedUserRole;
    }
    return null; // Placeholder return value, modify as needed
  });
  

  
  
  authenticateUser = action(() => {
    console.log("Attempting to hit the validate API route.");
    axios
      .post('http://localhost:3500/api/validate', { token: localStorage.jwtToken })
      .then(response => {
        if (response.data.authStatus === "validated") {
          console.log("Server says that I'm validated.");
          const converted = response.data.username.toString();
          const convertedUserRole = response.data.userRole.toString();
          this.setUserRole(convertedUserRole);
          this.setUserSubsequent(converted); // Wrap this call in an action?
        } else {
          //user validation failed with the server, so 
          this.logOutUser();
        }
      })
      .catch(error => {
        console.error(error);
      });
  });
  

  logOutUser = action(() => {
    this.user = null;
    this.token = null;
    this.authenticated = false;
    this.userRole = null;
    console.log("I logged the user out because they failed validation.");
  });

  clearUser = action(() => {
    this.user = null;
  });
}

const userStore = new UserStore();

export default userStore;