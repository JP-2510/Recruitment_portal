const express = require("express");

const router = express.Router();

const {
    loginMember,
    changePassword
} = require("../controllers/memberController");

router.post("/login", loginMember);

router.put("/change-password", changePassword);

module.exports = router;