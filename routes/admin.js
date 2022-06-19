const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');

router.get('/', AdminController.index);
router.get('/add_product', AdminController.add_product);
router.post('/save_product', AdminController.save_product);
router.get('/edit_product/:id', AdminController.edit_product);
router.post('/update_product', AdminController.update_product);

module.exports = router;