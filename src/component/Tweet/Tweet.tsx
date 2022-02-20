import classes from "./Tweet.module.css";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import TimeAgo from "timeago-react";
import { MouseEvent, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../constants/constants";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

interface Props {
  type: "tweet" | "reply";
  username: string;
  text: string;
  likes?: number;
  comments?: number;
  createdAt: Date;
  id: number;
  author?: string;
}

const Tweet: React.FC<Props> = ({
  type,
  text,
  likes,
  comments,
  username,
  createdAt,
  id,
  author,
}) => {
  const navigate = useNavigate();

  const [tweetLike, setTweetLike] = useState(likes);
  const [hasBeenLiked, setHasBeenLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  // const [isGettingLikes, setIsGettingLikes] = useState(false);
  const { user } = useContext(AuthContext);

  const handleLike = async (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
    if (isLiking) return;
    const config = {
      headers: { Authorization: `Bearer ${user?.token}` },
    };

    try {
      setIsLiking(true);
      if (hasBeenLiked) {
        if (tweetLike! >= 0) {
          setTweetLike(tweetLike! - 1);
        }
        await axios.delete(`${BASE_URL}/like/${id}`, config);
        setHasBeenLiked(false);
      } else {
        setTweetLike(tweetLike! + 1);
        await axios.post(`${BASE_URL}/like/${id}`, {}, config);
        setHasBeenLiked(true);
      }
      setIsLiking(false);
    } catch (e) {
      setIsLiking(false);
    }
  };

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user?.token}` },
        };
        const { data } = await axios.get(`${BASE_URL}/like/${id}`, config);

        setTweetLike(data.likes.length);

        console.log("&&&USER", user);

        const isLiked = data.likes.find(
          (like: any) => like.user.id === user.user[0].id
        );

        if (isLiked) {
          setHasBeenLiked(true);
        }
      } catch (e) {}
    };

    fetchLikes();
  }, [id, user?.token, user.user.id]);

  return (
    <div
      className={classes.root}
      onClick={() => type === "tweet" && navigate(`/twit/${id}`)}
    >
      <div className={classes.subRoot}>
        <div className={classes.imgContainer}>
          <p>{username && username.charAt(0)}</p>
        </div>
        <div className={classes.content}>
          <div className={classes.contentTop}>
            <h6 className={classes.username}>{username}</h6>
            <span className={classes.hrs}>
              <TimeAgo
                datetime={createdAt}
                locale="en_US"
                live={false}
                opts={{ minInterval: 300 }}
              />
            </span>
          </div>
          {type === "reply" && (
            <p className={classes.replyName}>
              Replied <span className={classes.replySpan}>{author}</span>
            </p>
          )}
          <p className={classes.tweet}>{text}</p>
          {type === "tweet" && (
            <div className={classes.iconContainer}>
              <div className={classes.twitAction}>
                <div className={classes.iconBox}>
                  <FaRegComment className={classes.twitIcon} />
                </div>
                <p className={classes.pText}>{comments}</p>
              </div>
              <div className={classes.twitAction}>
                <div className={classes.iconBox} onClick={(e) => handleLike(e)}>
                  <MdOutlineFavoriteBorder
                    style={{ color: hasBeenLiked ? "red" : "white" }}
                    className={classes.twitIcon}
                  />
                </div>
                <p className={classes.pText}>{tweetLike}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tweet;
