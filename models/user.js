"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Encriptar password
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  displayName: String,
  avatar: String,
  //   select: falsse (no me traera este campo al hacer un get a ese modelo)
  password: { type: String, select: false },
  //   cuando se registro
  signupDate: { type: Date, default: Date.now() },
  //   control de acceso
  lastLogin: Date
});

UserSchema.pre("save",function(next) {
  let user = this;
  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, (err, hash)=>{
        if (err) return next(err);
        user.password = hash
        next()
    });
  });
});

UserSchema.methods.gravatar = function () {
    if (!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`

    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://gravatar.com/avatar/${md5 }?s=200&d=retro`
}
module.exports = mongoose.model('User', UserSchema)