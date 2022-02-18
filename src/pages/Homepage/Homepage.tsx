import Search from "../../component/Search/Search";
import Sidebar from "../../component/Sidebar/Sidebar";
import Timeline from "../../component/Timeline/Timeline";
import classes from "./homepage.module.css";

const Homepage = () => {
  return (
    <div className={classes.root}>
      <div className={classes.sidebar}>
        <Sidebar />
      </div>
      <div className={classes.main}>
        <Timeline />
      </div>
      <div className={classes.search}>
          <Search />
      </div>
    </div>
  );
};

export default Homepage;
