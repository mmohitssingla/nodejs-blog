const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const sequelize = require('./config/database');
const User = require('./models/user');
const Product = require('./models/product');
const Cart = require('./models/cart');
const CartItem = require('./models/cart_item');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use(userRoutes);
app.use('/admin', adminRoutes);

User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });


sequelize
    .sync()
    // .sync({ force: true })
    .then(result => {
        return User.findByPk(1);
    })
    .then(user => {
        if (!user) {
            return User.create({ name: 'Peter Watts', email: 'peter123@mailinator.com' });
        }
        return user;
    })
    .then(() => {
        app.listen(3000);
    })
    .then(err => {
        console.log(err)
    })