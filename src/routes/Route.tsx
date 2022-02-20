import { Routes, Route } from "react-router-dom";
import Timeline from "../component/Timeline/Timeline";
import TweetDetail from "../component/TweetDetail/TweetDetail";
import RequireAuth from "../Auth/RequireAuth";
import Homepage from "../pages/Homepage/Homepage";
import LoginPage from "../pages/LoginPage/LoginPage";
import TweetProvider from "../context/TweetContext";
import MyTwits from "../component/MyTwits/MyTwits";

// TweetDetail
// Timeline

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <TweetProvider>
              <Homepage />
            </TweetProvider>
          </RequireAuth>
        }
      >
        <Route path="" element={<Timeline />} />
        <Route path="/profile" element={<MyTwits />} />
        <Route path="twit/:id" element={<TweetDetail />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Homepage />} />
    </Routes>
  );
};
// LoginPage
export default AppRoutes;

/**
 *           <RequireAuth>
</RequireAuth>
 */
