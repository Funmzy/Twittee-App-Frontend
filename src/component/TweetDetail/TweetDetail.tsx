import classes from "./TweetDetail.module.css";
import { IoIosArrowRoundBack } from "react-icons/io";
import Tweet from "../Tweet/Tweet";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Oval, TailSpin } from "react-loader-spinner";
import { BASE_URL } from "../../constants/constants";
import { TweetContext } from "../../context/TweetContext";
import { AiOutlineDelete } from "react-icons/ai";

const TweetDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { allTweets, setAllTweets } = useContext(TweetContext);
  const [isGetting, setIsGetting] = useState(false);
  const [tweet, setTweet] = useState<any>(null);
  const [isDeletingTwit, setIsDeletingTwit] = useState(false);

  const [isReplying, setIsReplying] = useState(false);

  const [text, setText] = useState("");

  console.log(user.user[0].id, "USER");

  const reply = async () => {
    if (!text) return;
    try {
      setIsReplying(true);
      const config = {
        headers: { Authorization: `Bearer ${user?.token}` },
      };

      const { data } = await axios.post(
        `${BASE_URL}/comment/${id}`,
        { comment: text },
        config
      );
      setText("");

      let newTweet = JSON.stringify(tweet);
      const parsedTweet = JSON.parse(newTweet);

      // console.log(newTweet, "PARSED");

      const userComment = {
        id: user.user.id,
        name: user.user[0].name,
        email: user.user.email,
        created_at: user.user.created_at,
      };
      data.comment[0].user = userComment;

      parsedTweet.comments.unshift(data.comment[0]);

      setTweet(parsedTweet);

      const currTweet = allTweets?.find((twt) => `${twt.id}` === id);
      const currTweetIdx = allTweets?.findIndex((twt) => `${twt.id}` === id);

      if (currTweetIdx && allTweets && currTweet) {
        const allNewTweet = [...allTweets];
        currTweet.comment.push(userComment);

        allNewTweet[currTweetIdx] = currTweet;
        setAllTweets(allNewTweet);
      }

      setIsReplying(false);
    } catch (e) {
      // console.log(e);
      setIsReplying(false);
      alert("an error ocurred");
    }
  };

  const deleteTwit = async () => {
    const config = {
      headers: { Authorization: `Bearer ${user?.token}` },
    };
    try {
      setIsDeletingTwit(true);

      console.log(id)
      console.log(user.user[0].id)

      const { data } = await axios.delete(`${BASE_URL}/twit/${id}`, config);

      console.log(data);
      const newTwits = allTweets?.filter((t) => t.id !== +id!);

      setAllTweets(newTwits!);

      navigate(-1);
      setIsDeletingTwit(false);
    } catch (e) {
      setIsDeletingTwit(false);
      console.log(e);
      alert("an error ocurred, unable to delete");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user?.token}` },
        };
        setIsGetting(true);

        const { data } = await axios.get(`${BASE_URL}/twit/${id}`, config);

        setTweet(data.twits);
        console.log(data.twits, "***");
        setText("");

        setIsGetting(false);
      } catch (e) {
        setIsGetting(false);
      }
    };

    fetchData();
  }, [id, user?.token]);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.back} onClick={() => navigate(-1)}>
          <IoIosArrowRoundBack className={classes.backIcon} />
        </div>
        <h2 className={classes.twitText}>Tweet</h2>
        {isDeletingTwit ? (
          <div className={classes.twitIcon}>
            <TailSpin
              ariaLabel="loading-indicator"
              height={17}
              width={17}
              // strokeWidth={5}
              color="white"
              // secondaryColor="#3498eb"
            />
          </div>
        ) : (
          tweet &&
          tweet.twits.user.id === user.user[0].id && (
            <AiOutlineDelete
              onClick={deleteTwit}
              className={classes.twitIcon}
            />
          )
        )}
        {/* {} */}
      </div>
      {isGetting ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "40vh",
          }}
        >
          <Oval
            ariaLabel="loading-indicator"
            height={17}
            width={17}
            strokeWidth={5}
            color="blue"
            secondaryColor="#3498eb"
          />
        </div>
      ) : tweet ? (
        <>
          <Tweet
            type="tweet"
            comments={tweet.comments.length}
            likes={tweet.likes}
            createdAt={tweet.twits.created_at}
            id={tweet.twits.id}
            text={tweet.twits.twit}
            username={tweet.twits.user.name}
          />
          <div className={classes.reply}>
            <div className={classes.imgBox}>
              <p>{user.user[0].name.charAt(0)}</p>
            </div>
            <div className={classes.content}>
              <p className={classes.replyName}>
                Replying{" "}
                <span className={classes.replySpan}>
                  @{tweet.twits.user.name}
                </span>
              </p>
              <input
                className={classes.input}
                type="text"
                name="reply"
                id="reply"
                placeholder="Tweet your reply"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <div className={classes.btnInput}>
                <button onClick={reply} className={classes.btn}>
                  {isReplying ? (
                    <Oval
                      ariaLabel="loading-indicator"
                      height={17}
                      width={17}
                      strokeWidth={5}
                      color="#fff"
                      secondaryColor="#3498eb"
                    />
                  ) : (
                    "Reply"
                  )}
                </button>
              </div>
            </div>
          </div>
          {tweet.comments.map((twt: any) => (
            <Tweet
              type="reply"
              createdAt={twt.created_at}
              id={twt.id}
              text={twt.comment}
              username={twt.user.name}
              key={twt.id}
            />
          ))}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default TweetDetail;
