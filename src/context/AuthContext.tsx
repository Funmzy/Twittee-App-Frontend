import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/constants";

interface IAuth {
  email: string;
  password: string;
}

interface AuthContextType {
  user: any;
  signIn: (user: IAuth, type: "login" | "signup") => void;
  isAuthing: boolean;
  authError: any;
  signOut: () => void;
}

export const AuthContext = React.createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<any>(
    () => JSON.parse(localStorage.getItem("twiteeUser") as string) || null
  );
  const [isAuthing, setIsAuthing] = useState(false);
  const [authError, setAuthError] = useState(null);

  const signIn = async (credentials: IAuth, type: "login" | "signup") => {
    try {
      setIsAuthing(true); // type: "login" | "signup"

      const url =
        type === "login"
          ? `${BASE_URL}/users/login`
          : `${BASE_URL}/users/signup`;

      const { data } = await axios.post(url, credentials);

      setIsAuthing(false);
      console.log(data, "DATA");

      data.data.token = data.token;

      // if (type === "login") {
      //   const user = [data.user];
      //   data.data.user = user;
      // }

      localStorage.setItem("twiteeUser", JSON.stringify(data.data));

      setUser(data.data);
    } catch (e: any) {
      setUser(null);
      setAuthError(e);
      setIsAuthing(false);
      const message =
        type === "login" ? "invalid login credentials" : "User already exist";
      alert(message);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("twiteeUser");
  };

  const value = { user, signIn, signOut, isAuthing, authError };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
