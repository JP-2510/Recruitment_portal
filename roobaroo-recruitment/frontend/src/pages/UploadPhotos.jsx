import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/uploadPhotos.css";

function UploadPhotos() {

    const [search, setSearch] = useState("");

    const [candidates, setCandidates] = useState([]);

    useEffect(() => {

        fetchCandidates();

    }, []);

    const fetchCandidates = async () => {

        try {

            const res = await axios.get(
                "http://localhost:3000/upload/candidates"
            );

            setCandidates(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    const filteredCandidates = candidates.filter(candidate =>

        candidate.ttr_id
            .toString()
            .includes(search)

        ||

        candidate.full_name
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    return (

        <div className="upload-page">

            <h1>Upload Candidate Photos</h1>

            <input

                type="text"

                placeholder="Search TTR ID or Name..."

                value={search}

                onChange={(e) =>
                    setSearch(e.target.value)
                }

                className="search-input"

            />

            <table>

                <thead>

                    <tr>

                        <th>TTR ID</th>

                        <th>Name</th>

                        <th>Vertical</th>

                        <th>Photo</th>

                        <th>Status</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        filteredCandidates.map(candidate => (

                            <tr key={candidate.ttr_id}>

                                <td>{candidate.ttr_id}</td>

                                <td>{candidate.full_name}</td>

                                <td>{candidate.vertical_name}</td>

                                <td>

{

candidate.photo_path ?

(

<img

src={`http://localhost:3000/${candidate.photo_path}`}

alt="Candidate"

className="photo-thumb"

/>

)

:

(

<span>No Photo</span>

)

}

</td>

<td>

{

candidate.photo_path

?

<span className="uploaded">

✅ Uploaded

</span>

:

<span className="pending">

❌ No Photo

</span>

}

</td>

<td>

<button>

{

candidate.photo_path

?

"Replace"

:

"Upload"

}

</button>

</td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default UploadPhotos;