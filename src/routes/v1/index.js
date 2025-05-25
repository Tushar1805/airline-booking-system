const express = require("express");
const router = express.Router();
const { InfoController } = require("../../controllers");
const airplaneRoutes = require("./airplane_routes");
const cityRoutes = require("./city_routes");

router.get("/info", InfoController.info);
router.use("/airplanes", airplaneRoutes);
router.use("/cities", cityRoutes);

module.exports = router;
