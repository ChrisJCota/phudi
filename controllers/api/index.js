const router = require("express").Router();
const userRoutes = require("./userRoutes");
const projectRoutes = require("./projectRoutes");
const { signup, gEmail } = require("../email");

router.use("/users", userRoutes);
router.post("/email", gEmail);

module.exports = router;
