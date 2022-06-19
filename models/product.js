const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    price: Sequelize.DOUBLE,
    in_stock: Sequelize.INTEGER
});

module.exports = Product;