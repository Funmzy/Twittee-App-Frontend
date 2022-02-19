import classes from "./TweetDetail.module.css";
import { IoIosArrowRoundBack } from "react-icons/io";
import Tweet from "../Tweet/Tweet";
import { useNavigate } from "react-router-dom";

const TweetDetail = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.back} onClick={() => navigate(-1)}>
          <IoIosArrowRoundBack className={classes.backIcon} />
        </div>
        <h2 className={classes.twitText}>Tweet</h2>
      </div>
      <Tweet type="tweet" />

      <div className={classes.reply}>
        <div className={classes.imgBox}>
          <p>S K</p>
        </div>
        <div className={classes.content}>
          <p className={classes.replyName}>
            Replying <span className={classes.replySpan}>@olujay</span>
          </p>
          <input
            className={classes.input}
            type="text"
            name="reply"
            id="reply"
            placeholder="Tweet your reply"
          />
          <div className={classes.btnInput}>
            <button className={classes.btn}>Reply</button>
          </div>
        </div>
      </div>
      <Tweet type="reply" />
      <Tweet type="reply" />
    </div>
  );
};

export default TweetDetail;
