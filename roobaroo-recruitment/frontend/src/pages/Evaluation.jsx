import axios from "axios";
import { useEffect, useState } from "react";
import {
    FaSearch,
    FaEye,
    FaCommentDots
} from "react-icons/fa";

import "../styles/evaluation.css";

function Evaluation() {

    const member = JSON.parse(localStorage.getItem("member"));

    const [search, setSearch] = useState("");
    const [preview, setPreview] = useState(null);
    const [verticalFilter, setVerticalFilter] = useState("All");
    const [decisionFilter, setDecisionFilter] = useState("All");
    const [round, setRound] = useState(1);

    // Dummy Data (Replace with backend later)

    const [candidates,setCandidates] = useState([]);

    useEffect(() => {

        fetchCandidates();
    
    }, [round]);
    
    const fetchCandidates = async () => {
    
        try{
    
            const res = await axios.get(

                `http://localhost:3000/evaluation/candidates?round=${round}`
                
                )
    
            setCandidates(res.data);
    
        }
    
        catch(err){
    
            console.log(err);
    
        }
    
    };

    const filteredCandidates = candidates.filter(candidate => {

        const matchSearch =
            String(candidate.ttr_id)
                .toLowerCase()
                .includes(search.trim().toLowerCase());

        const matchVertical =
    
            verticalFilter === "All"
    
            ||
    
            candidate.vertical_name === verticalFilter;
    
        const matchDecision =
    
            decisionFilter === "All"
    
            ||
    
            (candidate.decision || "Pending") === decisionFilter;
    
        return (
    
            matchSearch
    
            &&
    
            matchVertical
    
            &&
    
            matchDecision
    
        );
    
    });

    const updateScore = (ttr_id, vertical_id, value) => {

        setCandidates(prev =>
    
            prev.map(candidate =>
    
                candidate.ttr_id === ttr_id &&
    
                candidate.vertical_id === vertical_id
    
                ?
    
                {
    
                    ...candidate,
    
                    score:value
    
                }
    
                :
    
                candidate
    
            )
    
        );
    
    };

    const updateDecision = (ttr_id, vertical_id, value) => {

        setCandidates(prev =>
    
            prev.map(candidate =>
    
                candidate.ttr_id === ttr_id &&
    
                candidate.vertical_id === vertical_id
    
                ?
    
                {
    
                    ...candidate,
    
                    decision:value
    
                }
    
                :
    
                candidate
    
            )
    
        );
    
    };

    const updateRemark = (ttr_id, vertical_id, value) => {

        setCandidates(prev =>
    
            prev.map(candidate =>
    
                candidate.ttr_id === ttr_id &&
    
                candidate.vertical_id === vertical_id
    
                ?
    
                {
    
                    ...candidate,
    
                    remark: value
    
                }
    
                :
    
                candidate
    
            )
    
        );
    
    };

    const saveEvaluation = async (candidate) => {

        try{
    
            await axios.put(
    
                "http://localhost:3000/evaluation",
    
                {
    
                    ttr_id: candidate.ttr_id,
    
                    vertical_id: candidate.vertical_id,
    
                    round_no: round,
    
                    score: candidate.score,
    
                    remark: candidate.remark,
    
                    decision: candidate.decision
    
                }
    
            );

            await fetchCandidates();
    
        }
    
        catch(err){
    
            console.log(err);
    
            alert("Failed to Save Evaluation");
    
        }
    
    };

    const openImage = (photo) => {

        setPreview(photo);
    
    };


    return (

        <div className="evaluation-page">

            <div className="evaluation-header">

                <h1>

                    Evaluation

                </h1>

                <p>

                    Evaluate candidates according to your role.

                </p>

            </div>

            {/* Toolbar */}

            <div className="evaluation-toolbar">

                <div className="search-box">

                    <FaSearch />

                    <input

                        type="text"

                        placeholder="Search TTR ID..."

                        value={search}

                        onChange={(e)=>

                            setSearch(e.target.value)

                        }

                    />

                </div>

                {

                    member.role === "Coordinator" &&

                    <select

                        value={verticalFilter}

                        onChange={(e)=>

                            setVerticalFilter(e.target.value)

                        }

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

                }

                <select

                    value={decisionFilter}

                    onChange={(e)=>

                        setDecisionFilter(e.target.value)

                    }

                >


                    <option>All</option>
                    <option>Pending</option>
                    <option>Selected</option>
                    <option>Rejected</option>
                    <option>Discuss</option>

                </select>

                <select

value={round}

onChange={(e) => setRound(Number(e.target.value))}

>

<option value={1}>Round 1</option>

<option value={2}>Round 2</option>

<option value={3}>Round 3</option>

</select>


            </div>

            {/* Table */}

            <div className="table-container">

                <table>

                    <thead>

                        <tr>

                            <th>TTR ID</th>

                            <th>Name</th>

                            <th>Vertical</th>

                            <th>Photo</th>

                            <th>Remarks</th>

                            <th>Score</th>

                            <th>Decision</th>
                            <th>Save</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredCandidates.length === 0 ?

                            (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="empty"
                                    >

                                        No Candidates Found

                                    </td>

                                </tr>

                            )

                            :

                            filteredCandidates.map((candidate,index)=>(

                                <tr
                                key={`${candidate.ttr_id}-${candidate.vertical_id}`}
                            >

                                    <td>

                                        {candidate.ttr_id}

                                    </td>

                                    <td>

                                        {candidate.full_name}

                                    </td>

                                    <td>

                                        {candidate.vertical_name}

                                    </td>

                                   <td>
                                   {

candidate.photo_path ?

(

<button

className="icon-btn"

onClick={() => openImage(candidate.photo_path)}

>

<FaEye />

</button>

)

:

(

<span className="no-photo">

No Photo

</span>

)

}
                                   </td>

                                    <td>

    <textarea

        className="remarks-box"

        rows="2"

        placeholder="Write remarks..."

        value={candidate.remark || ""}

        onChange={(e)=>

            updateRemark(

                candidate.ttr_id,

                candidate.vertical_id,

                e.target.value

            )

        }

    />

                                          </td>

                                    <td>

                                        <input

                                            className="score-input"

                                            type="number"

                                            min="0"

                                            max="10"

                                            value={candidate.score}

                                            onChange={(e)=>

                                                updateScore(
                                                
                                                candidate.ttr_id,
                                                
                                                candidate.vertical_id,
                                                
                                                e.target.value
                                                
                                                )
                                                
                                                }

                                        />

                                    </td>

                                    <td>

                                        <select

                                            className="decision-select"

                                            value={candidate.decision}

                                            onChange={(e)=>

                                                updateDecision(

                                                    candidate.ttr_id,
                                                    
                                                    candidate.vertical_id,
                                                    
                                                    e.target.value
                                                    
                                                    )

                                            }

                                            >

                                            <option>

                                                Pending

                                            </option>

                                            <option>

                                                Selected

                                            </option>

                                            <option>

                                                Rejected

                                            </option>

                                            <option>

                                                Discuss

                                            </option>

                                        </select>

                                    </td>

                                    <td>

                                    <button
    className="save-btn"
    onClick={() => saveEvaluation(candidate)}
>

{
candidate.score !== null ||
candidate.remark ||
(candidate.decision && candidate.decision !== "Pending")

?

"✏️ Update"

:

"💾 Save"

}

</button>

</td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

            {

preview && (

<div

className="preview-overlay"

onClick={() => setPreview(null)}

>

<div

className="preview-box"

onClick={(e) => e.stopPropagation()}

>

<img

src={`http://localhost:3000/${preview}`}

alt="Candidate"

/>

<button

className="close-preview"

onClick={() => setPreview(null)}

>

✖ Close

</button>

</div>

</div>

)

}

        </div>

    );

}

export default Evaluation;