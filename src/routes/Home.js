import React, { useEffect, useState } from 'react';
import Twitters from '../components/Twitters';
import { dbService } from "../firebase";

function Home({ userObj }) {
  const [text, setText] = useState("");
  const [twitters, setTwitters] = useState([]);

  useEffect(() => {
    dbService.collection("twitter").onSnapshot((snapshot) => {
      const twitterArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTwitters(twitterArray);
    });
  }, []);
  
  const textHandler = (e) => {
    setText(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dbService.collection("twitter").add({
      text,
      createAt: Date.now(),
      createPerson: userObj.uid,
    });
    setText("");
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <input 
          onChange={textHandler} 
          value={text} 
          type="text" 
          placeholder="what is on your mind?"
          maxLength={120}
        />
        <input type="submit" value="submit"/>
      </form>

      <>
        {twitters.map((twitter) => (
          <Twitters 
            key={twitter.id} 
            twitterObj={twitter} 
            isLoggedIn={twitter.createPerson === userObj.uid} 
          />
        ))}
      </>
    </>
  )
};

export default Home;