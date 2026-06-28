import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Candidates from "./pages/Candidates";
import CandidateProfile from "./pages/CandidateProfile";
import Login from "./pages/Login";

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

      </Routes>
    </BrowserRouter>
  );
}

export default App;