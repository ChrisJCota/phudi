const router = require("express").Router();
const { Restaurant, Reservation, User } = require("../models");
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
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one gallery
// Use the custom middleware before allowing the user to access the gallery
router.get("/restaurant/:id", async (req, res) => {
  try {
    const restaurantData = await Restaurant.findByPk(req.params.id);

    const restaurant = restaurantData.get({ plain: true });

    res.render("restaurant", restaurant);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one painting
// Use the custom middleware before allowing the user to access the painting
router.get("/painting/:id", withAuth, async (req, res) => {
  try {
    const dbPaintingData = await Painting.findByPk(req.params.id);

    const painting = dbPaintingData.get({ plain: true });

    res.render("painting", { painting, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const reservationData = await Reservation.findAll({
      raw: true,
      where: { user_id: req.session.user_id },
      include: [
        {
          model: Restaurant,
          attributes: ["name"],
        },
      ],
    });

    console.log(reservationData);

    res.render("profile", {
      reservations: reservationData,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
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

// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;
*/
