const Sequelize = require('sequelize');

const sequelize = new Sequelize('blog', 'root', 'asdf@12345', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;