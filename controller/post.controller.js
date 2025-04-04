exports.create = async (req, res) => {
    if (!req.body.text) {
        return res.status(400).json({ message: "Veuillez saisir un texte" });
    }
};

exports.update = async (req, res) => {
    if (!req.body.text) {
        return res.status(400).json({ message: "Veuillez saisir un texte" });
    }

    const post = await Post.findOne({ _id: req.params.id });

    if (!post) {
        return res.status(404).json({ message: "Post non trouvé" });
    }

    post.text = req.body.text;

    if (req.image) {
        post.image = "./picture/" + req.image.filename;
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
