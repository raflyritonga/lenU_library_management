const { Student } = require('../models');

exports.getAllStudents = async (req, res) => {
     try {
          const students = await Student.findAll();
          res.json(students);
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
};

exports.createStudent = async (req, res) => {
     try {
          const student = await Student.create(req.body);
          res.status(201).json(student);
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
};

exports.updateStudent = async (req, res) => {
     try {
          const student = await Student.findByPk(req.params.id);
          if (student) {
               await student.update(req.body);
               res.json(student);
          } else {
               res.status(404).json({ message: 'Student not found' });
          }
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
};

exports.deleteStudent = async (req, res) => {
     try {
          const student = await Student.findByPk(req.params.id);
          if (student) {
               await student.destroy();
               res.sendStatus(204);
          } else {
               res.status(404).json({ message: 'Student not found' });
          }
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
};
