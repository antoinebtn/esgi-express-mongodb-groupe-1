exports.create = async (req, res) => {
    if (!req.body.text) {
        return res.status(400).json({ message: "Veuillez saisir un texte" })
    }
}