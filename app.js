const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const sequelize = require('./config/database');
const User = require('./models/user');
const Post = require('./models/post');
const userRoutes = require('./routes/user');

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

Post.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Post);


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