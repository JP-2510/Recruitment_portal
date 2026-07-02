import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../styles/results.css";
import axios from "axios";

function Results() {

    const [round, setRound] = useState(1);
    const [search, setSearch] = useState("");
    const [vertical, setVertical] = useState("All");
    const [summary, setSummary] = useState({
        evaluated: 0,
        selected: 0,
        discuss: 0,
        rejected: 0,
        pending: 0
    });
    
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {

        fetchSummary();
        fetchCandidates();
    
    }, [round]);

    const fetchSummary = async () => {

        try {
    
            const res = await axios.get(
                `http://localhost:3000/results/summary/${round}`
            );
    
            setSummary(res.data);
    
        }
    
        catch (err) {
    
            console.log(err);
    
        }
    
    };

    const fetchCandidates = async () => {

        try {
    
            const res = await axios.get(
                `http://localhost:3000/results/candidates/${round}`
            );
    
            setCandidates(res.data);
    
        }
    
        catch (err) {
    
            console.log(err);
    
        }
    
    };

    const filteredCandidates = candidates.filter(candidate => {

        const matchSearch =
    
            candidate.full_name
                .toLowerCase()
                .includes(search.toLowerCase())
    
            ||
    
            String(candidate.ttr_id)
                .includes(search);
    
        const matchVertical =
    
            vertical === "All"
    
            ||
    
            candidate.vertical_name.includes(vertical);
    
        return matchSearch && matchVertical;
    
    });

    return (

        <div className="results-page">

            <div className="results-header">

                <h1>Results</h1>

                <p>
                    View selected candidates round-wise.
                </p>

            </div>

            {/* Controls */}

            <div className="results-toolbar">

                <div className="search-box">

                    <FaSearch />

                    <input

                        type="text"

                        placeholder="Search TTR ID or Name..."

                        value={search}

                        onChange={(e)=>setSearch(e.target.value)}

                    />

                </div>

                <select
                    value={vertical}
                    onChange={(e)=>setVertical(e.target.value)}
                >

                    <option>All</option>
                    <option>Vocalist</option>
                    <option>Instrumentalist</option>
                    <option>Dancer</option>
                    <option>Anchor</option>
                    <option>Cameraman</option>
                    <option>Graphic Designer</option>
                    <option>Video Editor</option>
                    <option>Audio Editor</option>
                    <option>Sponsorship</option>

                </select>

                <select
                    value={round}
                    onChange={(e)=>setRound(e.target.value)}
                >

                    <option value={1}>Round 1</option>
                    <option value={2}>Round 2</option>
                    <option value={3}>Round 3</option>

                </select>

            </div>

            {/* Statistics */}

            <div className="stats-grid">

                <div className="stat-card">

                    <h3>Evaluated</h3>

                    <span>{summary.evaluated}</span>

                </div>

                <div className="stat-card">

                    <h3>Selected</h3>

                    <span>{summary.selected}</span>

                </div>

                <div className="stat-card">

                    <h3>Discuss</h3>

                    <span>{summary.discuss}</span>

                </div>

                <div className="stat-card">

                    <h3>Rejected</h3>

                    <span>{summary.rejected}</span>

                </div>

                <div className="stat-card">

                    <h3>Pending</h3>

                    <span>{summary.pending}</span>

                </div>

            </div>

            {/* Result Table */}

            <div className="table-container">

                <table>

                    <thead>

                        <tr>

                            <th>TTR ID</th>
                            <th>Name</th>
                            <th>Vertical</th>
                            <th>Status</th>

                        </tr>

                    </thead>

                    <tbody>

{

filteredCandidates.length === 0 ?

(

<tr>

<td
colSpan="4"
className="empty"
>

No Selected Candidates

</td>

</tr>

)

:

filteredCandidates.map(candidate => (

<tr key={candidate.ttr_id}>

<td>{candidate.ttr_id}</td>

<td>{candidate.full_name}</td>

<td>{candidate.vertical_name}</td>

<td>

<span className="status">

🟢 Selected

</span>

</td>

</tr>

))

}

</tbody>
                    
                </table>

            </div>

        </div>

    );

}

export default Results;