import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Candidates from "./pages/Candidates/Candidates";
import CandidateForm from "./pages/CandidateForm/CandidateForm";
import JobForm from "./pages/JobForm/JobForm";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/candidates/:id" element={<Candidates />} />
                    <Route
                        path="/addCandidate/:id/:candidateId/:bool"
                        element={<CandidateForm />}
                    />
                    <Route path="/addJob/:id/:bool" element={<JobForm />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
