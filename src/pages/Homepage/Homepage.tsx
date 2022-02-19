import { Outlet } from "react-router-dom";
import Search from "../../component/Search/Search";
import Sidebar from "../../component/Sidebar/Sidebar";
import classes from "./homepage.module.css";

const Homepage = () => {
  return (
    <div className={classes.root}>
      <div className={classes.sidebar}>
        <Sidebar />
      </div>
      <div className={classes.main}>
        <Outlet />
      </div>
      <div className={classes.search}>
        <Search />
      </div>
    </div>
  );
};

export default Homepage;
