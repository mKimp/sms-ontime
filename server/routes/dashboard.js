const router = require("express").Router();
const authorization = require("../middleware/authorization");
const pool = require("../database/dbconfig");
const sendSms = require("../middleware/SendSMS");

// all phone contacts
router.get("/", authorization, async (req, res) => {
  try {
    const userId = req.user;
    const user = await pool.query(
      "SELECT u.user_name, u.phone_number, c.phone_id, c.contact_name, c.contact_number FROM users AS u LEFT JOIN user_contacts AS c ON u.user_id = c.user_id WHERE u.user_id = $1",
      [userId]
    );
    res.json(user.rows);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

//create a contact
router.post("/contacts", authorization, async (req, res) => {
  try {
    const { contact_name, contact_number } = req.body;
    const newUser = await pool.query(
      "INSERT INTO user_contacts (user_id, contact_name, contact_number) VALUES ($1, $2, $3) RETURNING *",
      [req.user, contact_name, contact_number]
    );
    res.json(newUser.rows[0]);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

//update a contact
router.put("/contacts/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const { contact_name, contact_number } = req.body;
    const updateContact = await pool.query(
      "UPDATE user_contacts SET contact_name = $1, contact_number = $2 WHERE phone_id = $3 AND user_id = $4 RETURNING * ",
      [contact_name, contact_number, id, req.user]
    );

    if (updateContact.rows.length == 0) {
      return res.json("Not your contact");
    }
    res.json(updateContact.rows[0]);
  } catch (error) {
    res.status(500).send("Server error from editing");
  }
});

//delete a contact
router.delete("/contacts/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const updateContact = await pool.query(
      "DELETE FROM user_contacts WHERE phone_id = $1 AND user_id = $2 RETURNING *",
      [id, req.user]
    );

    if (updateContact.rows.length == 0) {
      return res.json("Can't delete the contact");
    }
    res.json(updateContact.rows[0]);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

router.post("/contacts/sms", authorization, async (req, res) => {
  try {
    const { sender, phone, message } = req.body;
    console.log(sender + "" + phone + "" + message);
    sendSms(sender, phone, message);
    res.status(201).send({
      message: "Message is sent!",
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});
module.exports = router;
