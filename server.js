const express = require("express");
const Nodemailer = require("nodemailer");
var cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/userModel.js");
const port = 9000;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("server is running");
});
const signup = async (val, email) => {
  const mailTransporter = Nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",

    port: 587,
    auth: {
      user: "arpitthakut722@gmail.com",
      pass: "JINstWEQ4xKzZm9r",
    },
  });
  let mailDetails = {
    from: "datingapp@gmail.com",
    to: email,
    subject: "dating app otp",
    text: "Hello world?",
    html: `<strong>'Your otp is'${val}</strong>`,
    headers: { "x-myheader": "test header" },
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs", err);
    } else {
      console.log("Email sent successfully");
    }
  });
  // const info = await transporter.sendMail({
  //   from: '<reid36@ethereal.email>',
  //   to: "kumaraman2334@gmail.com",
  //   subject: "Hello from node",
  //   text: "Hello world?",
  //   html: "<strong>Hello world?</strong>",
  //   headers: { 'x-myheader': 'test header' }
  // });
  // console.log(info)
};
app.post ("/confirmPassword",async(req,res)=>{
  console.log("newdfdvds")
  const {email,password} = req.body;
  try {
    let data  = await User.findOneAndUpdate({email:email},{password:password})
    res.status(200).json({
      success:true,
      msg:'Password changed successfully'
      
    })
    
  } catch (error) {
    res.status(400).json({
      success:false,
      msg:'something went wrong'
    })
    
  }

})
app.post("/otpValidate",async(req,res)=>{
  const{otp,email} = req.body;
  console.log(req.body)
 
  let user = await User.findOne({email,otp})
  console.log(user)
  if(!user){
    res.status(400).json({
      success:false,
      msg:"invalid otp"

    })
  }else{
    res.status(200).json({
      success:true,
      msg:"valid otp"

    })
    }

})
app.post("/forgotPassword", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status("not exist");
  }
  try {
    var user = await User.findOne({
      email,
    });
    if (!user) {
      res.status(404).json({
        success: false,
        msg: "invalid email id",
      });
      return;
    } else {
      const val = Math.floor(1000 + Math.random() * 9000);
      try {
        let person = await User.findByIdAndUpdate(user._id, { otp: val });
        let data = await signup(val, email);
        res.status(200).json({
          suceess: true,
          msg: "otp successfully send",
        });
      } catch (e) {
        console.log(e);
        res.status(404).json({
          success: false,
          msg: "Something went wrong",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/logIn", async (req, res) => {
  console.log("req.body")
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
    console.log(user)
    if (user.password != password) {
      return res.status(400).json({
        success: false,
        msg:"invalid password"
      });
    }
    return res.json({
      success: true,
      msg:"Login successfully"
    });
  } catch (error) {
    console.log(error);
  }
});
app.post("/signup", async (req, res) => {
  const val = Math.floor(1000 + Math.random() * 9000);

  console.log(req.body);
  const { name, email, password, age, gender } = req.body;
  try {
    const user = await User.create({
      fullName: name,
      email,
      password,
      age,
      gender,
      otp: val,
    });
    // signup(val,'signup_otp',email)
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
