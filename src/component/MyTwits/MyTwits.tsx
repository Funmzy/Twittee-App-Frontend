import React, { useContext, useEffect, useState } from "react";
import classes from "../Timeline/Timeline.module.css";
import { AiOutlineDeploymentUnit } from "react-icons/ai";
// import CreateTweet from "../CreateTweet/CreateTweet";
import Tweet from "../Tweet/Tweet";
import { useShowModal } from "../../pages/Homepage/Homepage";
import { Oval } from "react-loader-spinner";
import { AuthContext } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
import { BASE_URL } from "../../constants/constants";
import axios from "axios";

const MyTwits = () => {
  const { showModal } = useShowModal();

  const { user, signOut } = useContext(AuthContext);
  const [myTwits, setMyTwits] = useState<any>(null);
  const [isGetting, setIsGetting] = useState(false);

  useEffect(() => {
    const fetchMyTwits = async () => {
      try {
        setIsGetting(true);
        const config = {
          headers: { Authorization: `Bearer ${user?.token}` },
        };

        const { data } = await axios.get(
          `${BASE_URL}/twit/${user.user[0].id}/user`,
          config
        );

        setMyTwits(data.twits);

        setIsGetting(false);
      } catch (e: any) {
        console.log(e);
        setIsGetting(false);
      }
    };

    fetchMyTwits();
  }, [user?.token, user.user]);

  return (
    <div className={classes.root}>
      <div
        className={classes.header}
        style={{
          backgroundColor: showModal ? "#242D34" : "#000000",
        }}
      >
        <div className={classes.headerTop}>
          <h2 className={classes.title}>My Twits</h2>
          <AiOutlineDeploymentUnit className={classes.titleIcon} />
        </div>
        <div>
          <h5 className={classes.name}>{user.user[0].name} </h5>
          <h6 className={classes.email}>{user.user[0].email} </h6>
        </div>
        <nav className={classes.nav}>
          <div className={classes.links}>
            <NavLink className={classes.navLink} to="/">
              Home
            </NavLink>
            <NavLink className={classes.navLink} to="/profile">
              My Twits
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
        {/* <CreateTweet /> */}
        {myTwits &&
          myTwits.map((twit: any) => (
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
          {isGetting && (
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

export default MyTwits;
