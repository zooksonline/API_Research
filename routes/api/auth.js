const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const config = require("config");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");

router.post("/register", (req, res) => {
  const registerUser = async () => {
    // DB Config
    const db = await config.get("mongoEResearch");
    await mongoose
      .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        const Research = require("../../models/User");
        const { buasri_id, email, position, dep } = req.body;
        const newResearch = new Research({
          buasri_id,
          email,
          position,
          dep,
        });
        newResearch
          .save()
          .then((user) => {
            jwt.sign(
              { id: user.id },
              config.get("jwtSecret"),
              { expiresIn: 28800 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token: token,
                  user,
                });
              }
            );
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  registerUser();
});

router.post("/id", (req, res) => {
  // console.log(req.body);
  const authGetID = async () => {
    // DB Config
    const db = config.get("mongoEResearch");

    // Connect Mongo
    await mongoose
      .connect(db, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      })
      .then(() => {
        const User = require("../../models/User");
        const { buasri_id } = req.body;
        if (!buasri_id) {
          return res.status(400).json({
            msg: "ไม่มีข้อมูล Buasri ID ในระบบ Research โปรดเข้าใช้งานใหม่",
          });
        }
        mongoose.set("useFindAndModify", false);
        User.findOne({ buasri_id }).then((user) => {
          if (!user) {
            return res
              .status(400)
              .json({ msg: "BuasriID ไม่มีอยู่ในระบบ Research" });
          }
          if (user.active === "INACTIVE") {
            return res.status(400).json({
              msg: "BuasriID นี้ไม่สามารถใช้งานได้ในระบบ Research กรุณาติดต่อผู้ดูแล",
            });
          }
          jwt.sign(
            {
              id: user.id,
              buasri_id: user.buasri_id,
            },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token: token,
                user,
              });
            }
          );
        });
      })
      .catch((err) => console.log(err));
  };
  authGetID();
});

router.post("/update", auth, (req, res) => {
  const authUpdate = async () => {
    // DB Config
    const db = config.get("mongoEResearch");

    // Connect Mongo
    await mongoose
      .connect(db, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      })
      .then(() => {
        const User = require("../../models/User");
        const { buasri_id, email } = req.body;
        mongoose.set("useFindAndModify", false);
        User.findOneAndUpdate(
          { buasri_id: buasri_id },
          { email: email },
          { new: true }
        ).then((logUpdate) => res.json(logUpdate));
      })
      .catch((err) => console.log(err));
  };
  authUpdate();
});

router.get("/user", auth, (req, res) => {
  const authwithToken = async () => {
    const db = config.get("mongoEResearch");
    await mongoose
      .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        const User = require("../../models/User");
        User.findById(req.user.id).then((user) => res.json(user));
      })
      .catch((err) => console.log(err));
  };
  authwithToken();
});

module.exports = router;
