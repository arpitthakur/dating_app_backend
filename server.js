const express = require("express");
var cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/userModel.js");
const port = 8000;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("server is running");
});



app.post("/logIn", async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return res.send("not exist1");
  }
  try {
    let user = await User.findOne({
      email,
    });
    if (!user) {
      return res.json({
        success: false,
      });
    }
    if (user.password != password) {
      return res.json({
        success: false,
      });
    }
    return res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
});
app.post("/signup", async (req, res) => {
  console.log(req.body);
  const { name, email, password,age,gender } = req.body;
  try {
    const user = await User.create({
      fullName: name,
      email,
      password,
      age,
      gender,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`app is running on port${port}`);
});
mongoose
  .connect(
    "mongodb+srv://arpitThakur4931:Bullshit7@cluster0.l9btlcq.mongodb.net/dating_app?retryWrites=true&w=majority"
  )
  .then(() => console.log("connected"))
  .catch(() => console.log("error"));
