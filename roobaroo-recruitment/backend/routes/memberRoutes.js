const express = require("express");
const router = express.Router();

const { loginMember } = require("../controllers/memberController");

router.post("/login", loginMember);

module.exports = router;