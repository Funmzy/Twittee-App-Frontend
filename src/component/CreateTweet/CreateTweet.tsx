import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { TweetContext } from "../../context/TweetContext";
import classes from "./createtweet.module.css";
import { Oval } from "react-loader-spinner";

const CreateTweet = () => {
  const { user } = useContext(AuthContext);
  const [text, setText] = useState("");
  const { createTweet, isCreatingTwit } = useContext(TweetContext);

  const handleCreateTwit = () => {
    console.log(text, "TEXT");
    createTweet(text);
    setText("");
  };

  return (
    <div className={classes.root}>
      <div className={classes.twit}>
        <div className={classes.img_box}>
          <p className={classes.img_text}>{user.user.name.charAt(0)}</p>
        </div>
        <div className={classes.inputBox}>
          <input
            type="text"
            name="text"
            id="text"
            placeholder="What's Happening"
            className={classes.inputInput}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>
      <div className={classes.btnBox}>
        <button className={classes.btn} onClick={handleCreateTwit}>
          {isCreatingTwit ? (
            <Oval
              ariaLabel="loading-indicator"
              height={17}
              width={17}
              strokeWidth={5}
              color="blue"
              secondaryColor="#fff"
            />
          ) : (
            "Tweet"
          )}
        </button>
      </div>
    </div>
  );
};

export default CreateTweet;
