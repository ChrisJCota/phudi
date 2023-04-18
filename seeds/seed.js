const sequelize = require('../config/connection');
const { User, Restaurant, Reservation } = require('../models');

const userData = require('./userData.json');
const restaurantData = require('./restaurantData.json');
const reservationData = require('./reservationData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const restaurants = await Restaurant.bulkCreate(restaurantData, {
    individualHooks: true,
    returning: true,
  });

  for (const reservation of reservationData) {
    await Reservation.create({
      ...reservation,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      restaurant_id: restaurants[Math.floor(Math.random() * restaurants.length)].id
    });
  }

  process.exit(0);
};

seedDatabase();