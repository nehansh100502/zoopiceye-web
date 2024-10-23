
const nodemailer = require("nodemailer");
const User = require("../models/user"); // Importing User model

// Send email to selected users only
const sendMailToSelectedUsers = async (req, res) => {
    const { selectedUserEmails,message } = req.body; // expecting a list of emails to send to specific users
  
    try {
      // Step 1: Validate input (ensure there are selectedUserEmails)
      if (!selectedUserEmails || selectedUserEmails.length === 0) {
        return res.status(400).json({ message: "No selected user emails provided" });
      }
  
      // Step 2: Fetch selected users from the database
      const users = await User.find({ email: { $in: selectedUserEmails } });
  
      if (users.length === 0) {
        return res.status(404).json({ message: "No users found for the provided emails" });
      }
  
      // Step 3: Create SMTP connection
      let transporter = await nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: 'abigail.mraz@ethereal.email', // your ethereal or real smtp credentials
          pass: 'zb1q8FA9KRDEpBhk9s'
        },
      });
  
      // Step 4: Send email to each selected user
      const emailPromises = users.map(async (user) => {
        let info = await transporter.sendMail({
          from: '"Neha Singh 👻" <neha@gmail.com>', // sender address
          to: user.email, // receiver (fetched from db)
          subject: "Hello " + user.username, // Subject line with user name
          text: message ||`Hello ${user.username}, this is a special message for you!`, // plain text body
          html: `<b>Hello ${user.username}, this is a special message for you!</b>`, // html body
        });
        console.log(`Email sent to: ${user.email} | MessageId: ${info.messageId}`);
        return info;
      });
  
      // Step 5: Wait for all emails to be sent
      let results = await Promise.all(emailPromises);
  
      // Step 6: Respond with success
      res.json({
        message: "Emails sent to selected users successfully",
        results: results.map((info) => info.messageId),
      });
  
    } catch (error) {
      console.error("Error sending emails to selected users:", error);
      res.status(500).json({ message: "Error sending emails", error });
    }
  };
  

// Send email to all users or selected users
const sendMailToUsers = async (req, res) => {
  const { selectedUserEmails } = req.body; // expecting a list of emails to send to specific users

  try {
    // Step 1: Fetch users from the database (if selectedUserEmails is empty, fetch all users)
    let users;

    if (selectedUserEmails && selectedUserEmails.length > 0) {
      // Fetch selected users based on the provided emails
      users = await User.find({ email: { $in: selectedUserEmails } });
    } else {
      // Fetch all users if no specific selection
      users = await User.find();
    }

    // Step 2: Create SMTP connection
    let transporter = await nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: 'abigail.mraz@ethereal.email', // your ethereal or real smtp credentials
        pass: 'zb1q8FA9KRDEpBhk9s'
      },
    });

    // Step 3: Send email to each user
    const emailPromises = users.map(async (user) => {
      let info = await transporter.sendMail({
        from: '"Neha Singh 👻" <neha@gmail.com>', // sender address
        to: user.email, // receiver (fetched from db)
        subject: "Hello " + user.username, // Subject line with user name
        text: `Hello ${user.username}, welcome to our platform!Here We have Big deals For You ..`, // plain text body
        html: `<b>Hello ${user.username}, welcome to our platform !Here We have Big deals For You ..`, // html body
      });
      console.log(`Email sent to: ${user.email} | MessageId: ${info.messageId}`);
      return info;
    });

    // Step 4: Wait for all emails to be sent
    let results = await Promise.all(emailPromises);

    // Step 5: Respond with success
    res.json({
      message: "Emails sent successfully",
      results: results.map((info) => info.messageId),
    });

  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ message: "Error sending emails", error });
  }
};
// Get all users' emails
const getAllUserEmails = async (req, res) => {
    try {
      const users = await User.find({}, 'email username'); // Fetch all users with their emails and usernames
      const emails = users.map(user => ({
        email: user.email,
        username: user.username
      }));
      
      res.json({
        message: "All user emails fetched successfully",
        data: emails
      });
    } catch (error) {
      console.error("Error fetching all users' emails:", error);
      res.status(500).json({ message: "Error fetching users' emails", error });
    }
  };
  const getSelectedUserEmails = async (req, res) => {
    const { emails } = req.query; // Expects a query parameter 'emails' (comma-separated list)
  
    try {
      if (!emails || emails.length === 0) {
        return res.status(400).json({ message: "No emails provided in query parameters" });
      }
  
      // Convert the comma-separated emails into an array
      const emailArray = emails.split(',');
  
      const users = await User.find({ email: { $in: emailArray } }, 'email username'); // Fetch selected users by email
      const selectedEmails = users.map(user => ({
        email: user.email,
        username: user.username
      }));
      
      res.json({
        message: "Selected user emails fetched successfully",
        data: selectedEmails
      });
    } catch (error) {
      console.error("Error fetching selected users' emails:", error);
      res.status(500).json({ message: "Error fetching users' emails", error });
    }
  };  


module.exports = {
    getAllUserEmails, // for fetching all user emails
    getSelectedUserEmails, // for fetching selected user emails
    sendMailToUsers, // for sending to all or specific users
    sendMailToSelectedUsers // for sending only to selected users
  };
