import { Dispatch, SetStateAction, useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import classes from "../LoginModal/modal.module.css";
import { Oval } from "react-loader-spinner";

type Props = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

const SignupModal: React.FC<Props> = ({ setShowModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, isAuthing } = useContext(AuthContext);

  const handleLogin = () => {
    signIn({ email, password }, "signup");
  };
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.cancel_box} onClick={() => setShowModal(false)}>
          <h4 className={classes.cancel}>X</h4>
        </div>
        <div className={classes.header}>
          <svg viewBox="0 0 24 24" aria-hidden="true" className={classes.logo}>
            <g>
              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
            </g>
          </svg>
        </div>
        <h1 className={classes.title}>Create Your Account</h1>

        <form>
          <div className={classes.formGroup}>
            <input
              className={classes.formInput}
              type="text"
              name="email"
              id="email"
              placeholder="."
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
            <label className={classes.inputLabel} htmlFor="email">
              Email
            </label>
          </div>
          <div className={classes.formGroup}>
            <input
              className={classes.formInput}
              type="password"
              name="password"
              id="password"
              placeholder="."
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
            <label className={classes.inputLabel} htmlFor="password">
              Password
            </label>
          </div>
          <button
            style={{
              backgroundColor: email && password ? "#3498eb" : "#77797a",
            }}
            className={classes.button}
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            {isAuthing ? (
              <Oval
                ariaLabel="loading-indicator"
                height={17}
                width={17}
                strokeWidth={5}
                color="blue"
                secondaryColor="#3498eb"
              />
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
