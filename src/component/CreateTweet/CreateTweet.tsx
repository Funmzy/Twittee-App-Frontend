import React from "react";
import classes from "./createtweet.module.css";

const CreateTweet = () => {
  return (
    <div className={classes.root}>
      <div className={classes.twit}>
        <div className={classes.img_box}>
          <p className={classes.img_text}>O S</p>
        </div>
        <div className={classes.inputBox}>
          <input
            type="text"
            name="text"
            id="text"
            placeholder="What's Happening"
            className={classes.inputInput}
          />
        </div>
      </div>
      <div className={classes.btnBox}>
        <button className={classes.btn}>Tweet</button>
      </div>
    </div>
  );
};

export default CreateTweet;
