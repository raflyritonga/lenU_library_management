const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');

router.get('/', borrowController.getAllBorrows);
router.post('/', borrowController.createBorrow);
router.put('/:id', borrowController.updateBorrow);
router.delete('/:id', borrowController.deleteBorrow);

module.exports = router;
