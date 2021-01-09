import React from "react";
import { useHistory } from "react-router-dom"; 
import { firebaseInstance } from "../firebase"; 

function Profile() {
  const date = new Date();
  const auth = firebaseInstance.auth();
  const history = useHistory();
  const onClickBtn = () => {
    auth.signOut();
    history.push("/");
  };  

  return (
    <>
      <button onClick={onClickBtn}>Log Out</button>
      <div>Copyright &copy; {date.getFullYear()}</div>
    </>
  )
};

export default Profile;