const router = require("express").Router();
const pool = require("../database/dbconfig");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const authorization = require("../middleware/authorization");
//register route
router.post("/register", async (req, res) => {
  try {
    //destructure the req.body
    const { name, phoneNumber, email, password } = req.body;
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

      //insert the new user
      let newUser = await pool.query(
        "INSERT INTO users (user_name, phone_number, user_email, user_password) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, phoneNumber, email, hashedPass]
      );

      //generate our jwt token
      const token = jwtGenerator(newUser.rows[0].user_id);
      res.json({ token });
    }
  } catch (error) {
    res.status(500).send("Server error in registering");
  }
});

//login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(403).json("User not exist");
    }
    const checkPass = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );
    if (!checkPass) {
      return res.status(401).json("Invalid pass");
    }
    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

//verify if the user is who they are by checking the token
router.post("/is-verified", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    res.status(500).send("Server error");
  }
});
module.exports = router;
