import { Routes, Route } from "react-router-dom";
// import RequireAuth from "../Auth/RequireAuth";
import Homepage from "../pages/Homepage/Homepage";
import LoginPage from "../pages/LoginPage/LoginPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
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
