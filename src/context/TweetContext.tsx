import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { AuthContext } from "./AuthContext";

interface TweetContextType {
  allTweets: Record<string, any>[] | null;
  isGettingTweets: boolean;
  getTweetsErr: any;
  createTweet: (twit: string) => void;
  isCreatingTwit: boolean;
  setAllTweets: Dispatch<SetStateAction<Record<string, any>[] | null>>;
}

export const TweetContext = React.createContext<TweetContextType>(null!);

const TweetProvider = ({ children }: { children: React.ReactNode }) => {
  const [allTweets, setAllTweets] = useState<Record<string, any>[] | null>(
    null
  );
  const [isGettingTweets, setIsGettingTweets] = useState(false);
  const [getTweetsErr, setGetTweetsErr] = useState<any>(null);
  const [isCreatingTwit, setIsCreatingTwit] = useState(false);
  //   const [newTweet, setNewTweet]

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${user?.token}` },
    };
    const getTweets = async () => {
      try {
        setIsGettingTweets(true);
        const { data } = await axios.get(`${BASE_URL}/twit`, config);
        setAllTweets(
          data.twits.sort(
            (a: any, b: any) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )
        );
        setIsGettingTweets(false);
      } catch (e: any) {
        setGetTweetsErr(e);
        setIsGettingTweets(false);
      }
    };

    getTweets();
  }, [user?.token]);

  const createTweet = async (twit: string) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user?.token}` },
      };

      setIsCreatingTwit(true);

      const { data } = await axios.post(`${BASE_URL}/twit`, { twit }, config);



      const newTwit = {
        id: data.tweet[0].id,
        twit: data.tweet[0].twit,
        comment: [],
        like: [],
        user: {
          id: user.user[0].id,
          email: user.user[0].email,
          name: user.user[0].name,
        },
      };


      setAllTweets([newTwit, ...allTweets!]);
      if (allTweets) {
      }
      setIsCreatingTwit(false);
    } catch (e) {
      setIsCreatingTwit(false);
    }
  };

  const value = {
    allTweets,
    isGettingTweets,
    getTweetsErr,
    createTweet,
    isCreatingTwit,
    setAllTweets,
  };

  return (
    <TweetContext.Provider value={value}>{children}</TweetContext.Provider>
  );
};

export default TweetProvider;
