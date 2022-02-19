import classes from "./Tweet.module.css";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface Props {
  type: "tweet" | "reply";
}

const Tweet: React.FC<Props> = ({ type }) => {
  const navigate = useNavigate();

  return (
    <div className={classes.root} onClick={() => navigate("/twit")}>
      <div className={classes.subRoot}>
        <div className={classes.imgContainer}>
          <p>O S</p>
        </div>
        <div className={classes.content}>
          <div className={classes.contentTop}>
            <h6 className={classes.username}>Bra Danii</h6>
            <span className={classes.hrs}>9h</span>
          </div>
          {type === "reply" && (
            <p className={classes.replyName}>
              Replying <span className={classes.replySpan}>@olujay</span>
            </p>
          )}
          <p className={classes.tweet}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex
            molestias nulla architecto facere voluptatem eos!
          </p>
          <div className={classes.iconContainer}>
            <div className={classes.twitAction}>
              <div className={classes.iconBox}>
                <FaRegComment className={classes.twitIcon} />
              </div>
              <p className={classes.pText}>122</p>
            </div>
            <div className={classes.twitAction}>
              <div className={classes.iconBox}>
                <MdOutlineFavoriteBorder className={classes.twitIcon} />
              </div>
              <p className={classes.pText}>22</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
