var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: {type:String, unique: true, required:true},
    password:{type:String, required:true},
    firstName:{type:String, required:true},
    lastName:{type:String,  required:true},
    email:{type:String, unique:true, required:true},
    resetPasswordToken:String,
    resetPasswordExpires:Date,
    // isAdmin:{type:Boolean, default:false}
    
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);