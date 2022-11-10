const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
 fullName:{
  type:String,
  required:true
 },
 email:{
  type:String,

  lowercase:true,
  required:true
 },
 password:{
  type:String
 },
 gender:{
  type:String
 },
 age:{
  type:String
 },
 otp:{
  type:Number
  
 },
 isVerified:{
  type:Boolean
 }


})
module.exports = mongoose.model('User',userSchema)