import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Candidates from "./pages/Candidates";
import CandidateProfile from "./pages/CandidateProfile";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
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
          path="/" 
          element={<Home/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;