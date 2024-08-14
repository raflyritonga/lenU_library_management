const { Borrow, Book, Student } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.getAllBorrows = async (req, res) => {
     try {
          const borrows = await Borrow.findAll({
               include: [Student, Book]
          });
          res.json(borrows);
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
};

exports.createBorrow = async (req, res) => {
     try {
          const { studentId, bookId } = req.body;

          const book = await Book.findByPk(bookId);
          if (!book) {
               return res.status(404).json({ message: 'Book not found' });
          }

          const borrowedBooks = await Borrow.count({
               where: {
                    studentId,
                    returnDate: null
               }
          });

          if (borrowedBooks >= 10) {
               return res.status(400).json({ message: 'Borrowing limit reached' });
          }

          const borrow = await Borrow.create(req.body);
          res.status(201).json(borrow);
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
};

exports.updateBorrow = async (req, res) => {
     try {
          const borrow = await Borrow.findByPk(req.params.id);
          if (borrow) {
               await borrow.update(req.body);
               res.json(borrow);
          } else {
               res.status(404).json({ message: 'Borrow record not found' });
          }
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
};

exports.deleteBorrow = async (req, res) => {
     try {
          const borrow = await Borrow.findByPk(req.params.id);
          if (borrow) {
               await borrow.destroy();
               res.sendStatus(204);
          } else {
               res.status(404).json({ message: 'Borrow record not found' });
          }
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
};

// Helper function to calculate late fee
const calculateLateFee = (daysLate) => {
     if (daysLate <= 2) {
          return daysLate * 1000;
     }
     const additionalDays = daysLate - 2;
     const additionalPeriods = Math.ceil(additionalDays / 2);
     return (2000 * additionalPeriods);
};

// Check for overdue books and notify admin
exports.checkOverdueBooks = async () => {
     const today = new Date();
     const overdueBooks = await Borrow.findAll({
          where: {
               returnDate: null,
               dueDate: {
                    [Op.lt]: today
               }
          },
          include: [Student, Book]
     });

     overdueBooks.forEach(overdue => {
          const daysLate = Math.floor((today - new Date(overdue.dueDate)) / (1000 * 60 * 60 * 24));
          const lateFee = calculateLateFee(daysLate);
          // Implement your notification system here (e.g., Socket.IO, email)
          console.log(`Overdue Book: ${overdue.Book.title}, Late Fee: ${lateFee}`);
     });
};
