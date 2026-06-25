import { useEffect, useState } from "react";
import api from "../services/api";

function Candidates() {

    const [candidates, setCandidates] = useState([]);

    // useEffect(() => {

    //     api.get("/candidates")
    //         .then((response) => {
    //             setCandidates(response.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });

    // }, []);

    useEffect(() => {

        api.get("/candidates")
            .then((response) => {
    
                console.log(response.data);
    
                setCandidates(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    
    }, []);

    return (
        <div>
            <h1>Candidate List</h1>

            <table border="1">
                <thead>
                    <tr>
                        <th>TTR ID</th>
                        <th>Name</th>
                        <th>Branch</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>

                    {candidates.map((candidate) => (

                        <tr key={candidate.ttr_id}>
                            <td>{candidate.ttr_id}</td>
                            <td>{candidate.full_name}</td>
                            <td>{candidate.branch}</td>
                            <td>{candidate.final_status}</td>
                        </tr>

                    ))}

                </tbody>
            </table>

        </div>
    );
}

export default Candidates;