import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Loading from "./components/Loading";


// src/App.jsx
function App() {
  return (
    <>
      {/* <Home /> */}
      <Routes>
        
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Loading />}></Route>
      </Routes>
    </>
  );
}

export default App;
