const { Book } = require('../models');

exports.getAllBooks = async (req, res) => {
     try {
          const books = await Book.findAll();
          res.json(books);
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
};

exports.createBook = async (req, res) => {
     try {
          const book = await Book.create(req.body);
          res.status(201).json(book);
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
};

exports.updateBook = async (req, res) => {
     try {
          const book = await Book.findByPk(req.params.id);
          if (book) {
               await book.update(req.body);
               res.json(book);
          } else {
               res.status(404).json({ message: 'Book not found' });
          }
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
};

exports.deleteBook = async (req, res) => {
     try {
          const book = await Book.findByPk(req.params.id);
          if (book) {
               await book.destroy();
               res.sendStatus(204);
          } else {
               res.status(404).json({ message: 'Book not found' });
          }
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
};
