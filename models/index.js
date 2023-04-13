const User = require('./User');
const Restaurant = require('./Restaurant');
const Reservation = require('./Reservation');

User.hasMany(Reservation, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Reservation.belongsTo(User, {
    foreignKey: 'user_id'
});

Restaurant.hasMany(Reservation, {
    foreignKey: 'restaurant_id',
    onDelete: 'CASCADE'
});

Reservation.belongsTo(Restaurant, {
    foreignKey: 'restaurant_id'
});
