import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Candidates from "./pages/Candidates";
import CandidateProfile from "./pages/CandidateProfile";
import Login from "./pages/Login";
import Success from "./pages/Success";
import Dashboard from "./pages/Dashboard";
import ChangePassword from "./pages/Changepassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/candidates"
          element={<Candidates />}
        />

        <Route
          path="/candidate/:id"
          element={<CandidateProfile />}
        />

       <Route
         path="/login"
         element={<Login/>}
       /> 

        <Route
         path="/Dashboard"
         element={<Dashboard/>}
       /> 

       <Route
         path="/success"
         element={<Success />}
       />

       <Route
        path="/change-password"
        element={<ChangePassword />}
      />

      </Routes>
    </BrowserRouter>
  );
}

export default App;