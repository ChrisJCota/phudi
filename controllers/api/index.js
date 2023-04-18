const router = require("express").Router();
const userRoutes = require("./userRoutes");
const reservationRoutes = require("./reservationRoutes");

const { signup, gEmail } = require("../email");

router.use("/users", userRoutes);
router.use("/reservation", reservationRoutes);
router.post("/email", gEmail);

module.exports = router;
