const Product = require("../models/product");

exports.index = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('admin/index', {
                page_title: 'Admin Panel',
                heading: 'Product List',
                products: products
            });
        })
}

exports.add_product = (req, res, next) => {
    res.render('admin/add_product', {
        page_title: 'Admin Panel',
        heading: 'Add Product'
    });
}

exports.save_product = (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    const in_stock = req.body.in_stock;
    Product.create({
            name: name,
            price: price,
            in_stock: in_stock
        })
        .then(result => {
            res.redirect('/admin');
        })
        .catch(err => {
            console.log(err);
        })

}

exports.edit_product = (req, res, next) => {
    const product_id = req.params.id;
    Product.findByPk(product_id)
        .then(product => {
            res.render('admin/edit_product', {
                page_title: 'Admin Panel',
                heading: 'Edit Product',
                product: product
            });
        })
        .then(err => {
            console.log(err);
        })
}

exports.update_product = (req, res, next) => {
    const product_id = req.body.product_id;
    const name = req.body.name;
    const price = req.body.price;
    const in_stock = req.body.in_stock;
    Product.findByPk(product_id)
        .then(product => {
            product.name = name;
            product.price = price;
            product.in_stock = in_stock;
            product.save();
        })
        .then(result => {
            res.redirect('/admin');
        })
        .catch(err => {
            console.log(err);
        })
}