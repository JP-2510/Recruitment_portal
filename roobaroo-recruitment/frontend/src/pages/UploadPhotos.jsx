import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../styles/uploadPhotos.css";

function UploadPhotos() {

    const [search, setSearch] = useState("");

    const [candidates, setCandidates] = useState([]);

    const fileInputRef = useRef(null);

    const [selectedCandidate, setSelectedCandidate] = useState(null);

    const [preview,setPreview]=useState(null);


    const openImage=(photo)=>{

        console.log(photo);
        setPreview(photo);
    
    };
 

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

    const deletePhoto = async (ttr_id) => {

        try{
    
            await axios.delete(
    
                `http://localhost:3000/upload-photo/${ttr_id}`
    
            );
    
            fetchCandidates();
    
        }
    
        catch(err){
    
            console.log(err);
    
        }
    
    };

    const handleUploadClick = (candidate) => {

        setSelectedCandidate(candidate);
    
        fileInputRef.current.click();
    
    };
    
    const handleFileSelect = async (e) => {

        const file = e.target.files[0];
    
        if (!file || !selectedCandidate) return;
    
        const formData = new FormData();
    
        formData.append("photo", file);
    
        try {
    
            await axios.post(
    
                `http://localhost:3000/upload-photo/${selectedCandidate.ttr_id}`,
    
                formData,
    
                {
    
                    headers: {
    
                        "Content-Type": "multipart/form-data"
    
                    }
    
                }
    
            );
    
            // Refresh table
            await fetchCandidates();
    
            // Clear selected candidate
            setSelectedCandidate(null);
    
            // Reset input
            e.target.value = "";
    
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

        <button

            className="view-btn"

            onClick={() => openImage(candidate.photo_path)}

        >

            👁 View

        </button>

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

<button
onClick={()=>handleUploadClick(candidate)}
>

{

candidate.photo_path

?

"🔄 Replace"

:

"📤 Upload"

}

</button>

{

candidate.photo_path &&

<button

className="delete-btn"

onClick={()=>

deletePhoto(candidate.ttr_id)

}

>

🗑 Delete

</button>

}

</td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

            <input

    type="file"

    accept="image/*"

    capture="environment"

    ref={fileInputRef}

    style={{ display: "none" }}

    onChange={handleFileSelect}

/>



{

    preview && (
    
    <div
    className="preview-overlay"
    onClick={() => setPreview(null)}
    >
    
    <div
    className="preview-box"
    onClick={(e)=>e.stopPropagation()}
    >
    
    <img
    
    src={`http://localhost:3000/${preview}`}
    
    alt="Preview"
    
    />
    
    <button
    className="close-preview"
    onClick={()=>setPreview(null)}
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

export default UploadPhotos;