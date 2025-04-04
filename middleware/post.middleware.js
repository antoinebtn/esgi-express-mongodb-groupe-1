const Post = require("../models/post.model");

module.exports = (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).json({ message: "Paramètre ID inexistant" });
    }

    Post.findById(req.params.id)
        .then((post) => {
            if (!post) {
                return res.status(404).json({ message: "Post non trouvé" });
            }
            req.x_post = post;
            next();
        })
        .catch((err) => res.status(500).json({ message: err.message }));
};
