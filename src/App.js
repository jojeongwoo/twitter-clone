import React, { useEffect, useState } from "react";
import AppRouter from "./components/Router";
import Firebase from "../src/firebase"; 

function App() {
  const auth = Firebase.auth();
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  },[]);

  return (
    <div className="App">
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initlizing..."}
    </div>
  );
}

export default App;
