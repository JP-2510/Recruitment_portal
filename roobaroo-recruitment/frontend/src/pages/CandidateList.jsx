import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/candidateList.css";

function CandidateList() {

    const [candidates, setCandidates] = useState([]);
    const [search, setSearch] = useState("");
    const [verticalFilter, setVerticalFilter] = useState("All");

    useEffect(() => {
        fetchCandidates();
    }, []);

    const fetchCandidates = async () => {
        try {

            const res = await axios.get(
                "http://localhost:3000/candidates"
            );

            setCandidates(res.data);

        } catch (err) {

            console.log(err);

        }
    };

    // Get unique verticals
    const verticals = [
        "All",
        ...new Set(candidates.map(c => c.vertical_name))
    ];

    // Filter Candidates
    const filteredCandidates = candidates.filter(candidate => {

        const matchTTR =
            String(candidate.ttr_id)
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchVertical =
            verticalFilter === "All" ||
            candidate.vertical_name === verticalFilter;

        return matchTTR && matchVertical;

    });

    return (

        <div className="candidate-page">

            <div className="candidate-header">

                <h1>Candidate List</h1>

                <p>
                    View and manage registered candidates.
                </p>

            </div>

            <div className="candidate-toolbar">

                <input

                    type="text"

                    placeholder="Search TTR ID..."

                    value={search}

                    onChange={(e)=>

                        setSearch(e.target.value)

                    }

                />

                <select

                    value={verticalFilter}

                    onChange={(e)=>

                        setVerticalFilter(e.target.value)

                    }

                >

                    {

                        verticals.map((vertical)=>(

                            <option
                                key={vertical}
                                value={vertical}
                            >

                                {vertical}

                            </option>

                        ))

                    }

                </select>

            </div>

            <table>

<thead>

    <tr>

        <th>TTR ID</th>

        <th>Name</th>

        <th>Vertical</th>

        <th>Year</th>

        <th>Branch</th>

        <th>Email</th>

        <th>Phone</th>

    </tr>

</thead>

<tbody>

    {

        filteredCandidates.length === 0 ?

        (

            <tr>

                <td
                    colSpan="8"
                    style={{ textAlign: "center" }}
                >

                    No Candidates Found

                </td>

            </tr>

        )

        :

        filteredCandidates.map(candidate => (

            <tr key={candidate.ttr_id}>

                <td>{candidate.ttr_id}</td>

                <td>{candidate.full_name}</td>

                <td>{candidate.vertical_name}</td>

                <td>{candidate.year_of_study}</td>

                <td>{candidate.branch}</td>

                <td>{candidate.email}</td>

                <td>{candidate.phone}</td>

            </tr>

        ))

    }

</tbody>

</table>

        </div>

    );

}

export default CandidateList;