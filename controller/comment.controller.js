exports.create = async (req, res) => {
    if (!req.body.content) {
        return res
            .status(400)
            .json({ message: "Veuillez saisir le contenu du commentaire" });
    }

    const comment = new Comment({
        text: req.body.text,
        author: "0",
    });

    try {
        await comment.save();
        return res
            .status(201)
            .json({ message: "Commentaire créé avec succès", comment });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Erreur lors de la création du commentaire" });
    }
};

exports.update = async (req, res) => {
    if (!req.body.text) {
        return res.status(400).json({ message: "Veuillez saisir un texte" });
    }

    const comment = await Comment.findOne({ _id: req.params.id });

    if (!comment) {
        return res.status(404).json({ message: "Commentaire non trouvé" });
    }

    if (comment.author !== req.token.id) {
        return res.status(403).json({ message: "Action non autorisée" });
    }

    comment.text = req.body.text;

    try {
        await comment.save();
        return res.status(200).json({ message: "Commentaire mis à jour" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Erreur lors de la mise à jour du commentaire" });
    }
};

exports.delete = async (req, res) => {
    const comment = await Comment.findOne({ _id: req.params.id });

    if (!comment) {
        return res.status(404).json({ message: "Commentaire non trouvé" });
    }

    if (comment.author !== req.token.id) {
        return res.status(403).json({ message: "Action non autorisée" });
    }

    try {
        await Comment.deleteOne({ _id: req.params.id });
        return res.status(200).json({ message: "Commentaire supprimé" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Erreur lors de la suppression du commentaire" });
    }
};
