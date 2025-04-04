const jwt = require("jsonwebtoken");
const User = require("./../model/user.model.js");
const bcrypt = require("bcrypt");
const Post = require("../model/post.model.js");
require("dotenv").config();

exports.create = async (req, res) => {
    if (!req.body.text) {
        return res.status(400).json({ message: "Veuillez saisir un texte" });
    }

    const post = new Post({
        text: req.body.text,
        author: req.token.username,
    });

    if (req.image) {
        post.image = "./uploads/" + req.image.filename;
    }

    try {
        await post.save();
        return res.status(201).json({ message: "Post créé avec succès", post });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Erreur lors de la création du post" });
    }
};

exports.update = async (req, res) => {
    if (!req.body.text) {
        return res.status(400).json({ message: "Veuillez saisir un texte" });
    }

    const post = req.x_post;

    post.text = req.body.text;

    if (req.image) {
        post.image = "./uploads/" + req.image.filename;
    }

    try {
        await post.save();
        return res.status(200).json({ message: "Post mis à jour" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Erreur lors de la mise à jour du post" });
    }
};

exports.getAll = async (req, res) => {
    try {
        const { page = 1, limit = 10, sort = "desc" } = req.query;
        const postList = await Post.find()
            .sort({ createdAt: sort === "desc" ? -1 : 1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        if (!postList || postList.length === 0) {
            return res.status(404).json({ error: "Aucun post trouvé" });
        }
        return res.status(200).json(postList);
    } catch (error) {
        return res.status(500).json({ error: "Erreur serveur" });
    }
};

exports.delete = async (req, res) => {
    try {
        const post = req.x_post;

        if (post.author !== req.token.username) {
            return res.status(403).json({ error: "Action non autorisée" });
        }

        await Post.deleteOne({ _id: req.params.id });
        return res.status(200).json({ message: "Post supprimé avec succès" });
    } catch (error) {
        return res.status(500).json({ error: "Erreur serveur" });
    }
};
