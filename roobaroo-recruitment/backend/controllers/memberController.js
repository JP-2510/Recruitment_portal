const db = require("../db");

const loginMember = (req, res) => {

    const { email, password } = req.body;

    const sql = `
        SELECT *
        FROM member
        WHERE email = ?
    `;

    db.query(sql, [email], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (result.length === 0) {
            return res.status(401).json({
                message: "Invalid Email"
            });
        }

        const member = result[0];

        if (member.password !== password) {
            return res.status(401).json({
                message: "Invalid Password"
            });
        }

        res.json({
            message: "Login Successful",
            member: {
                member_id: member.member_id,
                full_name: member.full_name,
                role: member.role,
                academic_year: member.academic_year,
                vertical_id: member.vertical_id,
                must_change_password: member.must_change_password
            }
        });

    });

};

module.exports = {
    loginMember
};