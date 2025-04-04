const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./../model/user.model.js");
require("dotenv").config();

exports.signin = async (req, res) => {
    if (!req.body.email || req.body.email === "") {
        return res.status(400).json({ message: "Veuillez saisir un email, un username et un mot de passe" })
    }
    if (!req.body.username || req.body.username === "") {
        return res.status(400).json({ message: "Veuillez saisir un email, un username et un mot de passe" })
    }
    if (!req.body.password || req.body.password === "") {
        return res.status(400).json({ message: "Veuillez saisir un email, un username et un mot de passe" })
    }

    let user = await User.create({
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10)
    });
    res.status(201).json(user);
}

exports.login = async (req, res) => {
    if (!req.body.email || req.body.email === "" || !req.body.password || req.body.password === "") {
        return res.status(400).json({ message: "login ou mot de passe incorrect" })
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(401).json({ error: "login ou mot de passe incorrect" });
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).json({ error: "login ou mot de passe incorrect" });
    }
    return res.status(200).json({
        _id: user._id,
        email: user.email,
        username: user.username,
        token: jwt.sign({
            _id: user._id,
            email: user.email,
            username: user.username
        }, process.env.JWT_KEY, { expiresIn: '24H' })
    });
}