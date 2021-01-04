import React, { useState } from 'react';
import Firebase from "../firebase"; 

function Auth() {

  const auth = Firebase.auth();

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
      console.log(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

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
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
        {error}
      </form>

      <span onClick={toggleAccount}>
        {newAccount ? "Sing In" : "Create Account"}
      </span>

      <div>
        <button>Continue with Google</button>
      </div>
    </div>
  )
};

export default Auth;