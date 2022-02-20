import { Dispatch, SetStateAction, useContext, useState } from "react";
import classes from "./tweetmodal.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AuthContext } from "../../context/AuthContext";
import { TweetContext } from "../../context/TweetContext";
import { Oval } from "react-loader-spinner";

interface Prop {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const TweetModal: React.FC<Prop> = ({ setShowModal }) => {
  const { user } = useContext(AuthContext);
  const [text, setText] = useState("");
  const { createTweet, isCreatingTwit } = useContext(TweetContext);

  const handleCreateTwit = async () => {
    await createTweet(text);
    setText("");
    setShowModal(false);
  };
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.close} onClick={() => setShowModal(false)}>
          <AiOutlineCloseCircle className={classes.modalIcon} />
        </div>
        <div className={classes.inputbox}>
          <div className={classes.imgBox}>
            <p className={classes.imgText}>{user.user[0].name.charAt(0)}</p>
          </div>
          <input
            type="text"
            name="twit"
            id="twit"
            className={classes.input}
            placeholder="What's happening?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className={classes.inputBtn}>
          <button onClick={handleCreateTwit} className={classes.btn}>
            {isCreatingTwit ? (
              <Oval
                ariaLabel="loading-indicator"
                height={17}
                width={17}
                strokeWidth={5}
                color="blue"
                secondaryColor="#fff"
              />
            ) : (
              "Tweet"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TweetModal;
