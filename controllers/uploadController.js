const cloudinary = require("../utils/cloudinaryConfig"); 

async function uploadFileController(req, res) {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const base64Data = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
    const resourceType = file.mimetype.startsWith("image/") ? "image" : "raw";

    const uploadResult = await cloudinary.uploader.upload(base64Data, {
      folder: "gsphere",
      resource_type: resourceType
    });

    res.status(200).json({ url: uploadResult.secure_url });
  } catch (err)
   {
    console.error("Upload error:", err);
    res.status(500).json({ error: err });
  }
}

module.exports = {
  uploadFileController,
};
