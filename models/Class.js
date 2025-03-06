const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
  class_name: { type: String, required: true },
});

module.exports = mongoose.model('Class', ClassSchema);
