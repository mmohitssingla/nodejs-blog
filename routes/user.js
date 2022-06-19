const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/', UserController.index);
router.get('/profile', UserController.profile);
router.post('/update_profile', UserController.update_profile);

module.exports = router;