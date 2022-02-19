import React from "react";
import classes from "./Timeline.module.css";
import { AiOutlineDeploymentUnit } from "react-icons/ai";
import CreateTweet from "../CreateTweet/CreateTweet";
import Tweet from "../Tweet/Tweet";
import { useShowModal } from "../../pages/Homepage/Homepage";

const Timeline = () => {
  const { showModal } = useShowModal();
  return (
    <div className={classes.root}>
      <div
        className={classes.header}
        style={{
          backgroundColor: showModal ? "#242D34" : "#000000",
        }}
      >
        <h2 className={classes.title}>Home</h2>
        <AiOutlineDeploymentUnit className={classes.titleIcon} />
      </div>
      <div className={classes.content} style={{ color: "white" }}>
        <CreateTweet />
        <Tweet type="tweet" />
        <Tweet type="tweet" />
        <Tweet type="tweet" />
        <Tweet type="tweet" />
        <Tweet type="tweet" />
        <Tweet type="tweet" />
        <Tweet type="tweet" />
        <Tweet type="tweet" />
        <Tweet type="tweet" />
        <Tweet type="tweet" />
        <Tweet type="tweet" />
        <Tweet type="tweet" />
      </div>
    </div>
  );
};

export default Timeline;
