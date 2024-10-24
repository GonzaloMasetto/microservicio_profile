const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController'); 
const authMiddleware = require('../middleware/authMiddleware');

// Todas las rutas de perfil requerirán autenticación

router.get('/', authMiddleware, profileController.getProfile);
router.post('/', authMiddleware, profileController.createOrUpdateProfile);
router.post('/preferences', authMiddleware, profileController.createOrUpdateTagsProfile);

// Imagenes
router.post('/image',authMiddleware, profileController.createOrUpdateImage);
router.delete('/image', authMiddleware, profileController.deleteProfileImage);

module.exports = router;
