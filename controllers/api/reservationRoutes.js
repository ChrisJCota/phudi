const router = require("express").Router();
const { Reservation } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const newReservation = await Reservation.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newReservation);
  } catch (err) {
    res.status(400).json(err);
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
