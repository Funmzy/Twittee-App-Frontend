import { Dispatch, SetStateAction } from "react";
import classes from "./tweetmodal.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface Prop {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const TweetModal: React.FC<Prop> = ({ setShowModal }) => {
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.close} onClick={() => setShowModal(false)}>
          <AiOutlineCloseCircle className={classes.modalIcon} />
        </div>
        <div className={classes.inputbox}>
          <div className={classes.imgBox}>
            <p className={classes.imgText}>F L</p>
          </div>
          <input
            type="text"
            name="twit"
            id="twit"
            className={classes.input}
            placeholder="What's happening?"
          />
        </div>
        <div className={classes.inputBtn}>
          <button className={classes.btn}>Tweet</button>
        </div>
      </div>
    </div>
  );
};

export default TweetModal;
