import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import { BUCKET_NAME } from "./fileUpload.js";

const fileDownload = async (req, res, next) => {
    const { photoId } = req.params;

    if (!photoId) next();

    try {
        const bucket = new GridFSBucket(mongoose.connection.db, {
            bucketName: BUCKET_NAME,
        });

        const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(photoId));

        downloadStream.on("file", (file) => {
            res.set("Content-Type", file.contentType);
            res.set("Content-Disposition", "attachment; filename=" + file.filename);
        });

        downloadStream.on("error", (err) => {
            console.error("Error downloading file:", err);
            return res.status(404).json({ msg: "File not found" });
        });

        downloadStream.pipe(res);
    } catch (error) {
        console.error("Error in download middleware:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export default fileDownload;
