const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  unique_number: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  status: { type: String, enum: ["Present", "Absent"], default: "Absent" }
});

module.exports = mongoose.model('Student', StudentSchema);
