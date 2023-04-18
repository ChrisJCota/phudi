const router = require("express").Router();
const userRoutes = require("./userRoutes");
const projectRoutes = require("./projectRoutes");
const { signup, gEmail } = require("../email");
const reservationRoutes = require("./reservationRoutes");
router.use("/reservation", reservationRoutes);
router.use("/users", userRoutes);
router.post("/email", gEmail);

module.exports = router;
