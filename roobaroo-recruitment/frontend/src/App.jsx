import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Candidates from "./pages/Candidates";
import Login from "./pages/Login";
import Success from "./pages/Success";
import Dashboard from "./pages/Dashboard";
import ChangePassword from "./pages/Changepassword";
// import CandidateList from " ./pages/CandidateList";

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

{/* <Route
        path="/candidatelist"
        element={<CandidateList />}
      /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;