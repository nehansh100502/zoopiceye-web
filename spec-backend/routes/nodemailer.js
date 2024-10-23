
const express = require('express');

const router = express.Router();
const {sendMailToUsers,sendMailToSelectedUsers,  getAllUserEmails,getSelectedUserEmails} = require("../controllers/nodemailer");

router.post("/send-mails", sendMailToUsers);
router.post("/send-mails/selected", sendMailToSelectedUsers);

router.get("/emails", getAllUserEmails);

router.get("/emails/selected", getSelectedUserEmails);
module.exports = router;