const express = require("express");
const cors = require("cors");

const app = express();
//not to encounter the cors domain problem of front and back
app.use(express.json());
app.use(cors());

//Routes
app.use("/auth", require("./routes/jwtRouter"));
app.use("/admin", require("./routes/dashboard"));
app.listen(5000, () => {
  console.log("server is running on port 5000");
});
