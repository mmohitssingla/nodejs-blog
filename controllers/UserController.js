const User = require("../models/user");
const Post = require("../models/post");

exports.index = (req, res, next) => {
    req.user.getPosts({ order: [
            ['createdAt', 'DESC']
        ] }).then(posts => {
        res.render('user/index', {
            page_title: 'Home',
            heading: 'Article List',
            posts: posts
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

exports.add_post = (req, res, next) => {
    res.render('user/add_post', {
        page_title: 'Add Post',
        heading: 'Add New Post'
    });
}

exports.save_post = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    req.user.createPost({
            title: title,
            content: content
        })
        .then(result => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        })

}