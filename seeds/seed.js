const sequelize = require('../config/connection');
const { User, Restaurant } = require('../models');

const userData = require('./userData.json');
const restaurantData = require('./restaurantData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const restaurant of restaurantData) {
    await Restaurant.create({
      ...restaurant,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();