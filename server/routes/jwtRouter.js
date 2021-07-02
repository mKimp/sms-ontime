const router = require("express").Router();
const pool = require("../database/dbconfig");
const bcrypt = require("bcrypt");

//register route
router.post("/register", async (req, res) => {
  try {
    //destructure the req.body
    const { name, email, password } = req.body;
    //check if the user exist
    const userExists = await pool.query(
      "SELECT * FROM users WHERE user_email = $1",
      [email]
    );

    if (userExists.rows.length !== 0) {
      return res.status(401).send("User already exists");
    } else {
      //bcrypt the password
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPass = await bcrypt.hash(password, salt);

      let newUser = await pool.query(
        "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
        [name, email, hashedPass]
      );

      //generate our jwt token
    }

    //enter the new user inside our database

    //generate our jwt token
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
