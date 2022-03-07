const express = require("express");
const router = express.Router();
const config = require("config");
const auth = require("../../middleware/auth");

// Move File was Uploaded
router.post("/", auth, (req, res) => {
  // console.log(req.body);
  const fs = require("fs");
  if (req.files === null) {
    // console.log("No UploadFile")
    res.status(400).json({ msg: "No file Uploaded" });
  } else {
    const pathUpload = config.get("PathUpload");
    const pathFileUpload = config.get("PathFileUpload");

    const file = req.files.file;
    const buasri_id = req.body.buasri_id;
    const filePath = req.body.filePath;
    const path = pathUpload + buasri_id + "/";
    const pathfile = pathFileUpload + filePath;

    // console.log(req.files);
    // console.log("Has UploadFile!!!")

    if (fs.existsSync(path)) {
      console.log("nmk");
    } else {
      fs.mkdir(path, function (err) {
        console.log("mk");
      });
    }

    file.mv(pathfile, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
        return;
      }
      res.json({
        file_name: file.name,
        file_path: filePath,
      });
    });
  }
});

// Move Project File was Upload
router.post("/project", auth, (req, res) => {
  // console.log(req.body);
  const fs = require("fs");
  if (req.files === null) {
    // console.log("No UploadFile")
    res.status(400).json({ msg: "No file Uploaded" });
  } else {
    const pathUpload = config.get("ProjectPathUpload");
    const pathFileUpload = config.get("ProjectPathFileUpload");

    const file = req.files.file;
    const buasri_id = req.body.buasri_id;
    const filePath = req.body.filePath;
    const path = pathUpload + buasri_id + "/";
    const pathfile = pathFileUpload + "/" + filePath;

    // console.log(req.files);
    console.log("Has UploadFile!!!: " + pathfile);

    if (fs.existsSync(path)) {
      console.log("npmk");
    } else {
      fs.mkdir(path, function (err) {
        console.log("pmk");
      });
    }

    file.mv(pathfile, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
        return;
      }
      res.json({
        file_name: file.name,
        file_path: filePath,
      });
    });
  }
});

module.exports = router;
