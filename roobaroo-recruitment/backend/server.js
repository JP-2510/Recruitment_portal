const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const memberRoutes = require("./routes/memberRoutes");


const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            path.extname(file.originalname);

        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/member", memberRoutes);
app.use("/uploads",
    express.static("uploads")
);

app.get("/", (req,res)=>{
    console.log("Home route hit");
    res.send("Roobaroo Recruitment API Running");
});

app.post("/register", (req, res) => {

    const {
        full_name,
        branch,
        year_of_study,
        email,
        phone,
        verticals
    } = req.body;

    // Validate vertical selection
    if (!verticals || verticals.length === 0) {
        return res.status(400).json({
            message: "Please select at least one vertical."
        });
    }

    // Check duplicate email or phone
    const checkSql = `
        SELECT *
        FROM candidate
        WHERE email = ?
           OR phone = ?
    `;

    db.query(
        checkSql,
        [email, phone],
        (checkErr, checkResult) => {

            if (checkErr) {

                console.error(checkErr);

                return res.status(500).json({
                    message: "Database Error"
                });

            }

            if (checkResult.length > 0) {

                return res.status(409).json({
                    message: "Candidate with this email or phone number already exists."
                });

            }

            // Insert Candidate
            const candidateSql = `
                INSERT INTO candidate
                (
                    full_name,
                    branch,
                    year_of_study,
                    email,
                    phone
                )
                VALUES (?, ?, ?, ?, ?)
            `;

            db.query(
                candidateSql,
                [
                    full_name,
                    branch,
                    year_of_study,
                    email,
                    phone
                ],
                (err, result) => {

                    if (err) {

                        console.error(err);

                        return res.status(500).json({
                            message: "Unable to register candidate."
                        });

                    }

                    // Since AUTO_INCREMENT starts from 101,
                    // result.insertId will already be 101,102,...

                    const ttr_id = result.insertId;

                    const values = verticals.map(
                        (vertical_id) => [ttr_id, vertical_id]
                    );

                    const verticalSql = `
                        INSERT INTO candidate_vertical
                        (
                            ttr_id,
                            vertical_id
                        )
                        VALUES ?
                    `;

                    db.query(
                        verticalSql,
                        [values],
                        (err2) => {

                            if (err2) {

                                console.error(err2);

                                return res.status(500).json({
                                    message: "Candidate registered, but assigning verticals failed."
                                });

                            }

                            res.status(201).json({

                                message: "Registration Successful",

                                ttr_id

                            });

                        }
                    );

                }
            );

        }
    );

});

app.get("/candidates", (req, res) => {

    const sql = `
    SELECT
    c.ttr_id,
    c.full_name,
    c.branch,
    c.year_of_study,
    c.email,
    c.phone,
    GROUP_CONCAT(v.vertical_name SEPARATOR ', ') AS vertical_name,
    c.final_status

FROM candidate c

LEFT JOIN candidate_vertical cv
ON c.ttr_id = cv.ttr_id

LEFT JOIN vertical v
ON cv.vertical_id = v.vertical_id

GROUP BY
    c.ttr_id,
    c.full_name,
    c.branch,
    c.year_of_study,
    c.email,
    c.phone,
    c.final_status

ORDER BY c.ttr_id;
    `;

    db.query(sql, (err, result) => {

        if(err){

            console.log(err);

            return res.status(500).json({
                message:"Database Error"
            });

        }

        res.json(result);

    });

});

app.get("/upload/candidates", (req, res) => {

    const sql = `

    SELECT

    c.ttr_id,

    c.full_name,

    GROUP_CONCAT(v.vertical_name SEPARATOR ', ') AS vertical_name,

    MAX(cp.photo_path) AS photo_path

FROM candidate c

LEFT JOIN candidate_vertical cv
ON c.ttr_id = cv.ttr_id

LEFT JOIN vertical v
ON cv.vertical_id = v.vertical_id

LEFT JOIN candidate_photo cp
ON c.ttr_id = cp.ttr_id

GROUP BY

    c.ttr_id,

    c.full_name

ORDER BY

    c.ttr_id;

    `;

    db.query(sql,(err,result)=>{

        if(err){

            console.log(err);

            return res.status(500).json({
                message:"Database Error"
            });

        }

        res.json(result);

    });

});

app.get("/evaluation/candidates", (req, res) => {

    const sql = `

SELECT

    c.ttr_id,
    c.full_name,

    cv.vertical_id,

    v.vertical_name,

    MAX(cp.photo_path) AS photo_path,

    e.score,

    e.remark,

    COALESCE(e.decision,'Pending') AS decision

FROM candidate c

INNER JOIN candidate_vertical cv
ON c.ttr_id = cv.ttr_id

INNER JOIN vertical v
ON cv.vertical_id = v.vertical_id

LEFT JOIN candidate_photo cp
ON c.ttr_id = cp.ttr_id

LEFT JOIN evaluation e
ON c.ttr_id = e.ttr_id
AND cv.vertical_id = e.vertical_id
AND e.round_no = 1

GROUP BY

    c.ttr_id,
    c.full_name,
    cv.vertical_id,
    v.vertical_name,
    e.score,
    e.remark,
    e.decision

ORDER BY

    c.ttr_id;

`;

    db.query(sql, (err, result) => {

        if(err){

            console.log(err);

            return res.status(500).json({
                message:"Database Error"
            });

        }

        res.json(result);

    });

});

app.get("/candidate/:ttr_id", (req, res) => {

    const ttr_id = req.params.ttr_id;

    const sql = `
    SELECT
        c.ttr_id,
        c.full_name,
        c.branch,
        c.year_of_study,
        c.email,
        c.phone,

        MAX(cp.photo_path) AS photo_path,

        GROUP_CONCAT(v.vertical_name) AS verticals

    FROM candidate c

    LEFT JOIN candidate_photo cp
    ON c.ttr_id = cp.ttr_id

    LEFT JOIN candidate_vertical cv
    ON c.ttr_id = cv.ttr_id

    LEFT JOIN vertical v
    ON cv.vertical_id = v.vertical_id

    WHERE c.ttr_id = ?

    GROUP BY
        c.ttr_id,
        c.full_name,
        c.branch,
        c.year_of_study,
        c.email,
        c.phone
`;

    db.query(sql, [ttr_id], (err, result) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Candidate Not Found"
            });
        }

        res.json(result[0]);

    });

});

app.post(
    "/upload-photo/:ttr_id",
    upload.single("photo"),
    (req, res) => {

        const ttr_id = req.params.ttr_id;

        if (!req.file) {
            return res.status(400).json({
                message: "No photo uploaded"
            });
        }
        
        const photo_path = req.file.filename;

        const sql = `
            INSERT INTO candidate_photo
            (
                ttr_id,
                photo_path
            )
            VALUES (?, ?)
        `;

        db.query(
            sql,
            [ttr_id, photo_path],
            (err) => {

                if(err){
                    console.log(err);

                    return res.status(500).json({
                        message:
                        "Photo Upload Failed"
                    });
                }

                res.json({
                    message:
                    "Photo Uploaded Successfully"
                });

            }
        );

    }
);

app.post("/evaluation", (req, res) => {

    const {
        ttr_id,
        vertical_id,
        round_no,
        score,
        remark,
        decision
    } = req.body;

    const sql = `
        INSERT INTO evaluation
        (
            ttr_id,
            vertical_id,
            round_no,
            score,
            remark,
            decision
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            ttr_id,
            vertical_id,
            round_no,
            score,
            remark,
            decision
        ],
        (err, result) => {

            if(err){
                console.log(err);

                return res.status(500).json({
                    message: "Evaluation Failed"
                });
            }

            res.status(201).json({
                message: "Evaluation Saved",
                evaluation_id: result.insertId
            });

        }
    );

});

app.put("/evaluation", (req, res) => {

    const {

        ttr_id,
        vertical_id,
        round_no,
        score,
        remark,
        decision

    } = req.body;

    // Check if evaluation already exists

    const checkSql = `

        SELECT *

        FROM evaluation

        WHERE
            ttr_id = ?
            AND vertical_id = ?
            AND round_no = ?

    `;

    db.query(

        checkSql,

        [ttr_id, vertical_id, round_no],

        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: "Database Error"
                });

            }

            // -----------------------------
            // UPDATE
            // -----------------------------

            if (result.length > 0) {

                const updateSql = `

                    UPDATE evaluation

                    SET

                        score = ?,

                        remark = ?,

                        decision = ?

                    WHERE

                        ttr_id = ?

                        AND vertical_id = ?

                        AND round_no = ?

                `;

                db.query(

                    updateSql,

                    [

                        score,

                        remark,

                        decision,

                        ttr_id,

                        vertical_id,

                        round_no

                    ],

                    (err) => {

                        if (err) {

                            console.log(err);

                            return res.status(500).json({
                                message: "Update Failed"
                            });

                        }

                        return res.json({

                            message: "Evaluation Updated"

                        });

                    }

                );

            }

            // -----------------------------
            // INSERT
            // -----------------------------

            else {

                const insertSql = `

                    INSERT INTO evaluation

                    (

                        ttr_id,

                        vertical_id,

                        round_no,

                        score,

                        remark,

                        decision

                    )

                    VALUES

                    (?, ?, ?, ?, ?, ?)

                `;

                db.query(

                    insertSql,

                    [

                        ttr_id,

                        vertical_id,

                        round_no,

                        score,

                        remark,

                        decision

                    ],

                    (err) => {

                        if (err) {

                            console.log(err);

                            return res.status(500).json({
                                message: "Insert Failed"
                            });

                        }

                        return res.json({

                            message: "Evaluation Saved"

                        });

                    }

                );

            }

        }

    );

});

app.post("/mentor-assignment", (req, res) => {

    const {
        mentor_id,
        ttr_id
    } = req.body;

    const sql = `
        INSERT INTO mentor_assignment
        (
            mentor_id,
            ttr_id
        )
        VALUES (?, ?)
    `;

    db.query(
        sql,
        [mentor_id, ttr_id],
        (err, result) => {

            if(err){
                console.log(err);

                return res.status(500).json({
                    message: "Assignment Failed"
                });
            }

            res.status(201).json({
                message: "Mentor Assigned"
            });
        }
    );

});

app.get(
    "/evaluation/vertical/:vertical_id/round/:round_no",
    (req, res) => {

        const { vertical_id, round_no } = req.params;

        const sql = `
            SELECT
                e.evaluation_id,
                c.ttr_id,
                c.full_name,
                e.score,
                e.remark,
                e.decision,
                e.evaluated_at

            FROM evaluation e

            JOIN candidate c
            ON e.ttr_id = c.ttr_id

            WHERE
                e.vertical_id = ?
                AND e.round_no = ?

            ORDER BY e.score DESC
        `;

        db.query(
            sql,
            [vertical_id, round_no],
            (err, result) => {

                if(err){
                    console.log(err);

                    return res.status(500).json({
                        message: "Database Error"
                    });
                }

                res.json(result);
            }
        );
    }
);

app.get("/mentor/:mentor_id/candidates", (req, res) => {

    const mentor_id = req.params.mentor_id;

    const sql = `
        SELECT
            c.ttr_id,
            c.full_name,
            c.branch,
            c.year_of_study

        FROM mentor_assignment ma

        JOIN candidate c
        ON ma.ttr_id = c.ttr_id

        WHERE ma.mentor_id = ?
    `;

    db.query(sql, [mentor_id], (err, result) => {

        if(err){
            console.log(err);

            return res.status(500).json({
                message: "Database Error"
            });
        }

        res.json(result);

    });

});

app.post("/mentor-observation", (req, res) => {

    const {
        mentor_id,
        ttr_id,
        remark
    } = req.body;

    const sql = `
        INSERT INTO mentor_observation
        (
            mentor_id,
            ttr_id,
            remark
        )
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [mentor_id, ttr_id, remark],
        (err, result) => {

            if(err){
                console.log(err);

                return res.status(500).json({
                    message: "Observation Failed"
                });
            }

            res.status(201).json({
                message: "Observation Saved"
            });
        }
    );

});

app.listen(3000,()=>{
    console.log("Server Running On Port 3000");
});