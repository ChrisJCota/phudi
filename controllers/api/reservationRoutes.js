const router = require("express").Router();
const { Reservation, Restaurant, User } = require("../../models");
const withAuth = require("../../utils/auth");
const emailRequest = require("../../utils/email");
router.post("/", async (req, res) => {
  try {
    const newReservation = await Reservation.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    const userData = await User.findByPk(req.session.user_id);
    console.log(req.body);
    console.log(newReservation);
    const restaurantData = await Restaurant.findByPk(
      newReservation.restaurant_id
    );
    await emailRequest.sendConfirmation(
      userData,
      newReservation,
      restaurantData
    );

    res.status(200).json(newReservation);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.get("/:id", withAuth, async (req, res) => {
  try {
    const restaurantData = await Restaurant.findByPk(req.params.id);

    const restaurant = restaurantData.get({ plain: true });

    res.render("reservation", restaurant);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const reservationData = await Reservation.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!reservationData) {
      res.status(404).json({ message: "No project found with this id!" });
      return;
    }

    res.status(200).json(reservationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
