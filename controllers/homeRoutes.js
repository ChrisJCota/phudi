const router = require("express").Router();
const { Restaurant, User, Reservation } = require("../models");
const withAuth = require("../utils/auth");

// GET all galleries for homepage
router.get("/", async (req, res) => {
  try {
    const restaurantData = await Restaurant.findAll();

    const restaurants = restaurantData.map((restaurant) =>
      restaurant.get({ plain: true })
    );

    res.render("homepage", {
      restaurants,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/restaurant/:id", async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect("/login");
      return;
    }
  
    const restaurantData = await Restaurant.findByPk(req.params.id);

    const restaurant = restaurantData.get({ plain: true });

    res.render("restaurant", {
      restaurant,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// GET one gallery
// Use the custom middleware before allowing the user to access the gallery

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;

/*
router.get("/", async (req, res) => {
  return res.render("login");
  try {
    // Get all projects and JOIN with user data
    const projectData = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // Serialize data so the template can read it
    const projects = projectData.map((project) => project.get({ plain: true }));
    //const openHour=
    //const closeHour=
    //const hoursOfOperation=[];
    //   for (let i = openHour; i < closeHour; i++){hoursOfOperation.push(i)}
    // Pass serialized data and session flag into template
    res.render("homepage", {
      hoursOfOperation,
      projects,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/project/:id", async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render("project", {
      ...project,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
*/
// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const reservationData = await Reservation.findAll({
      raw: true,
      nest: true,
      where: { user_id: req.session.user_id },
      include: [
        {
          model: Restaurant,
          as: 'restaurant',
          attributes: ["name"],
        },
        {
          model: User,
          as: 'user',
          attributes: ["name"],
        },
      ],
    });

    res.render("profile", {
      reservations: reservationData,
      user: req.session.user,
      logged_in: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
