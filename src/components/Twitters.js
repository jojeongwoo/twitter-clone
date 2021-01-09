import React from "react";
import { dbService } from "../firebase";

function Twitters({ twitterObj, isLoggedIn }) {
  
  const deletePop = () => {
    const ok = window.confirm("정말 삭제하시겠습니까?");
    if(ok) {
      dbService.doc.delete();
    }
  };

  // console.log(isLoggedIn);
  return (
    <div>
      <h4>{twitterObj.text}</h4>

      {isLoggedIn && 
        <>
          <button onClick={deletePop}>Delete</button>
          <button>Edit</button>
        </>
      }
    </div>
  );
};

export default Twitters;