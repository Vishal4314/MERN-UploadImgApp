const express = require("express");
const multer = require("multer");
const moment = require("moment");
const router = new express.Router();
const user = require("../models/userSchema");

// img storage path
const imgConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}.${file.originalname}`);
  },
});

// img filter
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("Only Images are Allowed"));
  }
};

const upload = multer({
  storage: imgConfig, // img storage path
  fileFilter: isImage, // img filter
});

//register user data
router.post("/register", upload.single("photo"), async (req, res) => {
  const { filename } = req.file;
  const { name } = req.body;

  if (!name || !filename) {
    res.status(401).json({ status: 401, message: "Fill All the Data" });
  } else {
    const date = moment(new Date()).format("YYYY-MM-DD");

    try {
      const userData = new user({
        name: name,
        imgPath: filename,
        dateCreated: date,
      });

      const finalUserData = await userData.save();

      res.status(201).json({ status: 201, data: finalUserData });
    } catch (error) {
      res.status(401).json({ status: 401, error: error });
    }
  }
});

//get users data
router.get("/getData", async (req, res) => {
  try {
    const usersData = await user.find();
    res.status(201).json({ status: 201, data: usersData });
  } catch (error) {
    res.status(401).json({ status: 401, error: error });
  }
});

//delete user data
router.delete("/deleteUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await user.findByIdAndDelete({ _id: id });
    res.status(201).json({ status: 201, data: deletedUser });
  } catch (error) {
    res.status(401).json({ status: 401, error: error });
  }
});

module.exports = router;
