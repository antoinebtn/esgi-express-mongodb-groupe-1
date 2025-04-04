const Comment = require("./../model/comment.model.js");
const Post = require("../model/post.model.js");

exports.create = async (req, res) => {
    if (!req.body.content) {
        return res.status(400).json({ message: "Veuillez saisir le contenu du commentaire" });
    }

    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: "Post non trouvé" });
        }

        const comment = new Comment({
            content: req.body.content,
            author: req.token.username,
            postId: post._id
        });

        await comment.save();

        post.comments.push(comment._id);
        await post.save();

        return res.status(201).json({ message: "Commentaire créé avec succès", comment });
    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la création du commentaire" });
    }
};

exports.update = async (req, res) => {
    if (!req.body.content) {
        return res.status(400).json({ message: "Veuillez saisir un texte" });
    }

    try {
        const comment = await Comment.findOne({ _id: req.params.id });

        if (!comment) {
            return res.status(404).json({ message: "Commentaire non trouvé" });
        }

        if (comment.author !== req.token.username) {
            return res.status(403).json({ message: "Action non autorisée" });
        }

        comment.content = req.body.content;
        await comment.save();

        return res.status(200).json({ message: "Commentaire mis à jour", comment });
    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la mise à jour du commentaire" });
    }
};

exports.delete = async (req, res) => {
    try {
        const comment = await Comment.findOne({ _id: req.params.id });

        if (!comment) {
            return res.status(404).json({ message: "Commentaire non trouvé pour ce post" });
        }

        if (comment.author !== req.token.username) {
            return res.status(403).json({ message: "Action non autorisée" });
        }

        let postId = comment.postId

        await Comment.deleteOne({ _id: req.params.commentId });

        await Post.updateOne({ _id: postId}, { $pull: { comments: req.params.commentId } });

        return res.status(200).json({ message: "Commentaire supprimé avec succès" });
    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la suppression du commentaire" });
    }
};
