const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'waiter-life-easy',
    'root',
    'earth4800',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
)

module.exports = sequelize;
