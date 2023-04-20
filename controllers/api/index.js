const router = require("express").Router();
const userRoutes = require("./userRoutes");
const reservationRoutes = require("./reservationRoutes");

const { gEmail } = require("../../utils/email");

router.use("/users", userRoutes);
router.use("/reservation", reservationRoutes);

module.exports = router;
