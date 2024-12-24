import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Loading from "./components/Loading";
import Signup from "./components/Signup";
import ForgetPassword from "./components/ForgetPassword";

// src/App.jsx
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/loading" element={<Loading />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/forgetPassowrd" element={<ForgetPassword />}></Route>
      </Routes>
    </>
  );
}

export default App;
