import express from "express";

const router = express.Router();

const supportedAssets = [ "svg", "png", "jpg", "jpeg", "mp4", "ogv" ];

const assetExtentionRegex = () => {
    const formattedExtensionList = supportedAssets.join("|");

    // eslint-disable-next-line no-useless-escape
    return new RegExp(`/.+\.(${formattedExtensionList})$`);
};

router.get(assetExtentionRegex(), () => {

});

export default router;