import { useState } from "react";
import "../styles/evaluation.css";

function Evaluation() {

    const member = JSON.parse(localStorage.getItem("member"));

    const [search, setSearch] = useState("");

    const [vertical, setVertical] = useState("All");

    // Dummy Data (Replace with backend later)
    const candidates = [
        {
            ttr_id: 101,
            full_name: "Jatin Parmar",
            vertical: "Vocalist, Anchor",
            photo: "https://via.placeholder.com/180x220"
        },
        {
            ttr_id: 102,
            full_name: "Samrat Rathod",
            vertical: "Cameraman",
            photo: "https://via.placeholder.com/180x220"
        }
    ];

    const filteredCandidates = candidates.filter((candidate) => {

        const matchSearch = String(candidate.ttr_id)
            .includes(search);

        const matchVertical =
            vertical === "All" ||
            candidate.vertical.includes(vertical);

        return matchSearch && matchVertical;

    });

    return (

        <div className="evaluation-page">

            <div className="evaluation-header">

                <h1>Evaluation</h1>

                <p>
                    Evaluate candidates according to your assigned role.
                </p>

            </div>

            <div className="evaluation-toolbar">

                <input
                    type="text"
                    placeholder="Search TTR ID..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                {

                    member.role === "Coordinator" && (

                        <select
                            value={vertical}
                            onChange={(e) =>
                                setVertical(e.target.value)
                            }
                        >

                            <option value="All">All Verticals</option>
                            <option value="Vocalist">Vocalist</option>
                            <option value="Instrumentalist">Instrumentalist</option>
                            <option value="Dancer">Dancer</option>
                            <option value="Anchor">Anchor</option>
                            <option value="Graphic Designer">Graphic Designer</option>
                            <option value="Video Editor">Video Editor</option>
                            <option value="Audio Editor">Audio Editor</option>
                            <option value="Cameraman">Cameraman</option>
                            <option value="Sponsorship">Sponsorship</option>

                        </select>

                    )

                }

            </div>

            {

                filteredCandidates.length === 0 ?

                (

                    <div className="no-candidate">

                        No Candidate Found

                    </div>

                )

                :

                filteredCandidates.map((candidate) => (

                    <div
                        className="candidate-card"
                        key={candidate.ttr_id}
                    >

                        {/* Left Section */}

                        <div className="candidate-left">

                            <img
                                src={candidate.photo}
                                alt="Candidate"
                            />

                            <div className="candidate-info">

                                <h2>

                                    {candidate.full_name}

                                </h2>

                                <p>

                                    <strong>TTR ID :</strong>

                                    {candidate.ttr_id}

                                </p>

                                <div className="vertical-badges">

                                    {

                                        candidate.vertical
                                            .split(", ")
                                            .map((item) => (

                                                <span
                                                    className="badge"
                                                    key={item}
                                                >

                                                    {item}

                                                </span>

                                            ))

                                    }

                                </div>

                            </div>

                        </div>

                        {/* Right Section */}

                        <div className="candidate-right">

                            <div className="input-group">

                                <label>

                                    Score (Out of 10)

                                </label>

                                <input
                                    type="number"
                                    placeholder="Enter Score"
                                    min="0"
                                    max="10"
                                />

                            </div>

                            <div className="input-group">

                                <label>

                                    Remarks

                                </label>

                                <textarea
                                    rows="5"
                                    placeholder="Write your remarks here..."
                                >

                                </textarea>

                            </div>

                            <div className="input-group">

                                <label>

                                    Decision

                                </label>

                                <select>

                                    <option>Pending</option>

                                    <option>Selected</option>

                                    <option>Rejected</option>

                                    <option>Discuss</option>

                                </select>

                            </div>

                            <button
                                className="save-btn"
                            >

                                Save Evaluation

                            </button>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default Evaluation;