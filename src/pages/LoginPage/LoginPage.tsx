// import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useEffect, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
import classes from "./login.module.css";
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import SignupModal from "../../component/SignupModal/SignupModal";
import LoginModal from "../../component/LoginModal/LoginModal";
import { useNavigate } from "react-router-dom";

// interface CustomizedState {
//   from: string;
// }

const LoginPage = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  const auth = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  // const state = location.state as CustomizedState;

  // const login = () => {
  //   // signIn("user", () => {});log
  //   if (state && state.from) {
  //     const { from } = state;
  //     navigate(from, { replace: true });
  //   } else {
  //     navigate("/");
  //   }
  // };

  useEffect(() => {
    if (auth.user) {
      navigate("/");
    }
  }, [auth.user, navigate]);

  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <div className={classes.logo_bg}>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={classes.main_logo}
          >
            <g>
              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
            </g>
          </svg>
        </div>
        <div
          className={classes.loginform}
          style={{
            backgroundColor:
              showLoginModal || showSignupModal ? "#242D34" : "#0000000",
          }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className={classes.logo}>
            <g>
              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
            </g>
          </svg>

          <h1 className={classes.title}>Happening now</h1>
          <h4 className={classes.subTitle}>Join Twitter today.</h4>
          <div className={classes.action_container}>
            <button className={classes.btn_social}>
              <FcGoogle className={classes.btn_icon} />
              <span className={classes.btn_google_text}>
                Sign up with Google
              </span>
            </button>
            <button className={classes.btn_social}>
              <BsApple className={classes.btn_icon} />
              <span className={classes.btn_text}>Sign up with Google</span>
            </button>

            <div className={classes.alternative}>
              <div className={classes.alternativeLine}> &nbsp; </div>
              <p className={classes.alternativeOr}>or</p>
              <div className={classes.alternativeLine}> &nbsp; </div>
            </div>

            <button
              className={classes.btn_email}
              onClick={() => setShowSignupModal(true)}
            >
              Sign up with email.
            </button>
            <p className={classes.policy}>
              By signing up, you agree to the <span>Terms of Service</span> and{" "}
              <span>Privacy Policy</span> , including <span>Cookie Use.</span>
            </p>
            <h6 className={classes.already}>Already have an account?</h6>
            <button
              className={classes.signinBtn}
              onClick={() => setShowLoginModal(true)}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
      <div className={classes.bottom}>
        <ul className={classes.nav_list}>
          <li>About</li>
          <li>Help Center</li>
          <li>Terms of Service</li>
          <li>Privacy Policy</li>
          <li>Cookie Policy</li>
          <li>Accessibility</li>
          <li>Ads info</li>
          <li>Blog</li>
          <li>Status</li>
          <li>Careers</li>
          <li>Brand Resources</li>
          <li>Advertising</li>
          <li>Marketing</li>
          <li>Twitter for Business</li>
          <li>Developers</li>
          <li>Directory</li>
        </ul>
        <ul className={classes.nav_copy}>
          <li>Settings</li>
          <li> &copy; 2022 twitee, inc. </li>
        </ul>
      </div>
      {/* <button onClick={() => login()}>Login</button> */}
      {showSignupModal && <SignupModal setShowModal={setShowSignupModal} />}
      {showLoginModal && <LoginModal setShowModal={setShowLoginModal} />}
    </div>
  );
};

export default LoginPage;
