import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Candidates from "./pages/Candidates";
import CandidateProfile from "./pages/CandidateProfile";

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

      </Routes>
    </BrowserRouter>
  );
}

export default App;