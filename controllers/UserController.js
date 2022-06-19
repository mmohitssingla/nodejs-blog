const User = require("../models/user");
const Product = require("../models/product");

exports.index = (req, res, next) => {
    Product.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
        where: { in_stock: 1 }
    }).then(products => {
        res.render('user/index', {
            page_title: 'Home',
            heading: 'Product List',
            products: products
        });
    })
}

exports.profile = (req, res, next) => {
    User.findByPk(req.user.id)
        .then(user => {
            res.render('user/profile', {
                page_title: 'Profile',
                heading: 'My Profile',
                user: user
            });
        })
        .catch(err => {
            console.log(err);
        })

}

exports.update_profile = (req, res, next) => {
    const name = req.body.name;
    User.findByPk(req.user.id)
        .then(user => {
            user.name = name;
            user.save();
        })
        .then(result => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        })
}