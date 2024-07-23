const express = require('express');
const router = express.Router();
const authController = require('../main/java/com/aplicacion_gestion_tareas/aplicacion_gestion_tareas/controllers/authController');

router.post('/signup', authController.register);
router.post('/signin', authController.login);

module.exports = router;
