const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/notifications');

router.post('/send-email', notificationsController.sendEmailOption1);
router.post('/send-email/template', notificationsController.sendEmailOption2);

module.exports = router;
