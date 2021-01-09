import React, { useEffect, useState } from "react";
import AppRouter from "./components/Router";
import { firebaseInstance } from "../src/firebase"; 

function App() {
  const auth = firebaseInstance.auth();
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  },[]);

  return (
    <div className="App">
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initlizing..."}
    </div>
  );
}

export default App;
