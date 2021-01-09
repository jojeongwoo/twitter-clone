import React, { useState } from "react";
import { firebaseInstance } from "../firebase"; 

function Auth() {

  const auth = firebaseInstance.auth();
  const date = new Date();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const EmailHandler = e => {
    setEmail(e.target.value);
  };

  const PasswordHandler = e => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await auth.createUserWithEmailAndPassword(
          Email, 
          Password
        ); 
      } else {
        data = await auth.signInWithEmailAndPassword(
          Email, 
          Password
        );
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
    setEmail("");
    setPassword("");
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  const googleLogin = async (e) => {
    let provider;
    provider = new firebaseInstance.auth.GoogleAuthProvider();
    const data = await auth.signInWithPopup(provider);
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text" 
          value={Email} 
          placeholder="Email" 
          onChange={EmailHandler} 
          required 
        />
        <input 
          type="password" 
          value={Password} 
          placeholder="Password" 
          onChange={PasswordHandler} 
          required
        />
        <input type="submit" value={newAccount ? "Create Account" : "Sign In"} />
        {error}
      </form>

      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>

      <div>
        <button onClick={googleLogin} name="google">Continue with Google</button>
      </div>
      <div>Copyright &copy; {date.getFullYear()}</div>
    </div>
  )
};

export default Auth;