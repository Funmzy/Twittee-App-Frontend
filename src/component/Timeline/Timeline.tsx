import React, { useContext } from "react";
import classes from "./Timeline.module.css";
import { AiOutlineDeploymentUnit } from "react-icons/ai";
import CreateTweet from "../CreateTweet/CreateTweet";
import Tweet from "../Tweet/Tweet";
import { useShowModal } from "../../pages/Homepage/Homepage";
import { TweetContext } from "../../context/TweetContext";
import { Oval } from "react-loader-spinner";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Timeline = () => {
  const { showModal } = useShowModal();
  const { allTweets, isGettingTweets } = useContext(TweetContext);
  const { signOut } = useContext(AuthContext);

  return (
    <div className={classes.root}>
      <div
        className={classes.header}
        style={{
          backgroundColor: showModal ? "#242D34" : "#000000",
        }}
      >
        <div className={classes.headerTop}>
          <h2 className={classes.title}>Home</h2>
          <AiOutlineDeploymentUnit className={classes.titleIcon} />
        </div>
        <nav className={classes.nav}>
          <div className={classes.links}>
            <NavLink className={classes.navLink} to="/">
              {" "}
              Home{" "}
            </NavLink>
            <NavLink className={classes.navLink} to="/profile">
              {" "}
              My Twits{" "}
            </NavLink>
          </div>
          <div>
            <button className={classes.navBtn} onClick={() => signOut()}>
              Logout
            </button>
          </div>
        </nav>
      </div>
      <div className={classes.content} style={{ color: "white" }}>
        <CreateTweet />
        {allTweets &&
          allTweets.map((twit) => (
            <Tweet
              key={twit.id}
              type="tweet"
              text={twit.twit}
              likes={twit.like.length}
              comments={twit.comment.length}
              username={twit.user.name}
              createdAt={twit.created_at}
              id={twit.id}
            />
          ))}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "40vh",
          }}
        >
          {isGettingTweets && (
            <Oval
              ariaLabel="loading-indicator"
              height={17}
              width={17}
              strokeWidth={5}
              color="blue"
              secondaryColor="#3498eb"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
