import React from "react";
import classes from "./Timeline.module.css";
import { AiOutlineDeploymentUnit } from "react-icons/ai";
import CreateTweet from "../CreateTweet/CreateTweet";

const Timeline = () => {
  return (
    <div className={classes.root}>
      <div className={classes.header} style={{ color: "white" }}>
        <h2 className={classes.title}>Home</h2>
        <AiOutlineDeploymentUnit className={classes.titleIcon} />
      </div>
      <div className={classes.content} style={{ color: "white" }}>
        <CreateTweet />
      </div>
    </div>
  );
};

export default Timeline;
