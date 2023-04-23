const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    dish: {
        type: Sequelize.STRING,
        allowNull: false
    },
    table: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Order;