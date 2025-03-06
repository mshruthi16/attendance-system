const express = require('express');
const multer = require('multer');
const csvParser = require('csv-parser');
const fs = require('fs');
const Class = require('../models/Class');
const Student = require('../models/Student');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// ✅ Create a New Class
router.post('/classes', async (req, res) => {
  try {
    const newClass = new Class({ class_name: req.body.class_name });
    await newClass.save();
    res.json({ message: "Class created", class_id: newClass._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Import Users via CSV
router.post('/classes/:class_id/import', upload.single('file'), async (req, res) => {
  const classId = req.params.class_id;
  const students = [];

  fs.createReadStream(req.file.path)
    .pipe(csvParser())
    .on('data', (row) => {
      students.push({
        class_id: classId,
        unique_number: row.unique_number,
        name: row.name
      });
    })
    .on('end', async () => {
      await Student.insertMany(students);
      fs.unlinkSync(req.file.path);
      res.json({ message: "Users imported", total_users: students.length });
    });
});

// ✅ Mark Attendance
router.post('/classes/:class_id/attendance', async (req, res) => {
  const { unique_number } = req.body;
  const student = await Student.findOneAndUpdate(
    { unique_number },
    { status: "Present" },
    { new: true }
  );

  if (student) {
    res.json({ message: "Attendance updated", unique_number, status: "Present" });
  } else {
    res.json({ message: "User not found", unique_number });
  }
});

// ✅ Fetch Present Students
router.get('/classes/:class_id/present', async (req, res) => {
  const students = await Student.find({ class_id: req.params.class_id, status: "Present" });
  res.json({ class_id: req.params.class_id, present_students: students });
});

// ✅ Fetch Absent Students
router.get('/classes/:class_id/absent', async (req, res) => {
  const students = await Student.find({ class_id: req.params.class_id, status: "Absent" });
  res.json({ class_id: req.params.class_id, absent_students: students });
});

module.exports = router;
