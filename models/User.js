const mongoose = require('mongoose');

const User = new mongoose.Schema({
 name: {
  type: String,
  required: true,
 },
 email: {
  type: String,
  required: true,
  unique: true,
  lowercase: true
 },
 isEnterprise: {
  type: Boolean,
  requiredd: true,
  default: false,
 },
 createdAt: {
  type: Date,
  default: Date.now,
 }
});

module.exports = mongoose.model('User', User);