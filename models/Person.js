const mongoose = require('mongoose');

const Person = new mongoose.Schema({
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

 salary: {
  type: Number,
  required: false
 },

 approved: {
  type: Boolean,
  required: true,
 },

 createdAt: {
  type: Date,
  default: Date.now,
 }
});

module.exports = mongoose.model('Person', Person);