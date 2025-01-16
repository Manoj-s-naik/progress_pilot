import { createRoot } from "react-dom/client";
import "./main.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthWrapper from "./components/AuthContext.jsx";
import TaskWrapper from "./components/TaskContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthWrapper>
    <TaskWrapper>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TaskWrapper>
  </AuthWrapper>
);
