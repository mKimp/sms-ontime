const router = require("express").Router();
const authorization = require("../middleware/authorization");
const pool = require("../database/dbconfig");

router.get("/", authorization, async (req, res) => {
  try {
    const userId = req.user;
    const userName = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [userId]
    );
    res.json({
      name: userName.rows[0].user_name,
      phoneNumber: userName.rows[0].phone_number,
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
