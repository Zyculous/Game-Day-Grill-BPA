import express from "express";

const router = express.Router();

const supportedAssets = [ "svg", "png", "jpg", "jpeg", "mp4", "ogv" ];

const assetExtentionRegex = () => {
    const formattedExtensionList = supportedAssets.join("|");

    return new RegExp(`/.+\.(${formattedExtensionList})$`);
};

router.get(assetExtentionRegex(), (req, res) => {
    res.redirect(303, `http://localhost:5173/src${req.path}`);
});

export default router;