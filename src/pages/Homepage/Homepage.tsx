import { useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import Search from "../../component/Search/Search";
import Sidebar from "../../component/Sidebar/Sidebar";
import TweetModal from "../../component/TweetModal/TweetModal";
import classes from "./homepage.module.css";

type ContextType = { showModal: boolean };

const Homepage = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div
      className={classes.root}
      style={{
        backgroundColor: showModal ? "#242D34" : "#000000",
      }}
    >
      <div className={classes.sidebar}>
        <Sidebar setShowModal={setShowModal} />
      </div>
      <div className={classes.main}>
        <Outlet context={{ showModal }} />
      </div>
      <div className={classes.search}>
        <Search />
      </div>
      {showModal && <TweetModal setShowModal={setShowModal} />}
    </div>
  );
};

export function useShowModal() {
  return useOutletContext<ContextType>();
}

export default Homepage;
