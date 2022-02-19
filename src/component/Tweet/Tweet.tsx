import classes from "./Tweet.module.css";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { format, render, cancel, register } from "timeago.js";

interface Props {
  type: "tweet" | "reply";
  username: string;
  text: string;
  likes: number;
  comments: number;
  createdAt: Date;
}

const Tweet: React.FC<Props> = ({
  type,
  text,
  likes,
  comments,
  username,
  createdAt,
}) => {
  const navigate = useNavigate();

  return (
    <div className={classes.root} onClick={() => navigate("/twit")}>
      <div className={classes.subRoot}>
        <div className={classes.imgContainer}>
          <p>{username.charAt(0)}</p>
        </div>
        <div className={classes.content}>
          <div className={classes.contentTop}>
            <h6 className={classes.username}>{username}</h6>
            <span className={classes.hrs}>
              {format(`${createdAt}`, "en_US")}
            </span>
          </div>
          {type === "reply" && (
            <p className={classes.replyName}>
              Replying <span className={classes.replySpan}>@olujay</span>
            </p>
          )}
          <p className={classes.tweet}>{text}</p>
          <div className={classes.iconContainer}>
            <div className={classes.twitAction}>
              <div className={classes.iconBox}>
                <FaRegComment className={classes.twitIcon} />
              </div>
              <p className={classes.pText}>{comments}</p>
            </div>
            <div className={classes.twitAction}>
              <div className={classes.iconBox}>
                <MdOutlineFavoriteBorder className={classes.twitIcon} />
              </div>
              <p className={classes.pText}>{likes}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
