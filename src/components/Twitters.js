import React, { useState } from "react";
import { dbService } from "../firebase";

function Twitters({ twitterObj, isLoggedIn }) {

  const [editMode, setEditMode] = useState(false);
  const [newTwit, setNewTwit] = useState(twitterObj.text);
  
  const onDelete =  async () => {
    const ok = window.confirm("정말 삭제하시겠습니까?");
    if(ok) {
      await dbService.doc(`twitter/${twitterObj.id}`).delete();
    }
  };

  const toggleMode = () => {
    setEditMode((prev) => !prev);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.doc(`twitter/${twitterObj.id}`).update({
      text: newTwit,
    });
    setEditMode(false);
  };

  const onChange = (e) => {
    setNewTwit(e.target.value);
  }

  return (
    <div>
      {
        editMode ? 
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="new edit text"
              value={newTwit}
              required
              onChange={onChange}
            />
            <input type="submit" value="Submit" />
          </form>
          <button onClick={toggleMode}>Cancel</button>
        </>
        :
        <>
            <h4>{twitterObj.text}</h4>
            {isLoggedIn && (
              <>
                <button onClick={onDelete}>DELETE</button>
                <button onClick={toggleMode}>EDIT</button>
              </>
            )}
        </>
      }    
    </div>
  );
};

export default Twitters;