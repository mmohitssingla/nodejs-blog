const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/', UserController.index);
router.get('/profile', UserController.profile);
router.post('/update_profile', UserController.update_profile);
router.get('/add_post', UserController.add_post);
router.post('/save_post', UserController.save_post);

module.exports = router;