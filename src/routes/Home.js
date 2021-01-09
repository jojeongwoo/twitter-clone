import React, { useEffect, useState } from 'react';
import Twitters from '../components/Twitters';
import { dbService, firebaseInstance } from "../firebase";

function Home({ userObj }) {
  const [text, setText] = useState("");
  const [twitters, setTwitters] = useState([]);
  const [img, setImg] = useState();

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
  
  const onChangeImage = (e) => {
    e.preventDefault();
    const files = e.target.files;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const { currentTarget : { result }, 
      }= finishedEvent;
      setImg(result);
    }
    reader.readAsDataURL(theFile);
  };

  const onClearImg = () => setImg(null);

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
        <input type="file" accept="image/*" onChange={onChangeImage}/>
        <input type="submit" value="submit" />
        {img && (
          <div>
            <img src={img} width="50px" height="50px" />
            <button onClick={onClearImg}>Clear</button>
          </div>
        )}
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