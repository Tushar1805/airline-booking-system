const express = require('express');
const router = express.Router();
const { InfoController } = require('../../controllers');
const airplaneRoutes = require('./airplane_routes');

router.get('/info', InfoController.info);
router.use('/airplanes', airplaneRoutes);

module.exports = router;