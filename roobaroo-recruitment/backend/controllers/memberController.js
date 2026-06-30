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



const changePassword = (req, res) => {

    const {
        member_id,
        currentPassword,
        newPassword
    } = req.body;

    const sql = `
        SELECT *
        FROM member
        WHERE member_id = ?
    `;

    db.query(sql, [member_id], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Member Not Found"
            });
        }

        const member = result[0];

        if (member.password !== currentPassword) {

            return res.status(401).json({
                message: "Current Password Incorrect"
            });

        }

        const updateSql = `
            UPDATE member
            SET
                password = ?,
                must_change_password = FALSE
            WHERE member_id = ?
        `;

        db.query(
            updateSql,
            [newPassword, member_id],
            (err) => {

                if (err) {

                    return res.status(500).json({
                        message: "Password Update Failed"
                    });

                }

                res.json({
                    message: "Password Changed Successfully"
                });

            }
        );

    });

};

module.exports = {
    loginMember,
    changePassword
};