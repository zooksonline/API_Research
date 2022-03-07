const express = require("express");
const router = express.Router();
const config = require("config");
const auth = require("../../middleware/auth");

// Add Deadline Send
router.put("/add", auth, (req, res) => {
  console.log(req.body);
  const DeadlineAdd = async () => {
    // DB Config
    const mongoose = require("mongoose");
    const db = config.get("mongoEResearch");

    // Connect Mongo
    await mongoose
      .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        // Deadline Model
        const Deadline = require("../../models/Deadline");
        const { buasri_id, datetime, status } = req.body;
        mongoose.set("useFindAndModify", false);
        Deadline.findOne({ name: "time" }).then((name) => {
          if (name) {
            Deadline.findOneAndUpdate(
              { name: "time" },
              {
                $push: {
                  date: {
                    buasri_id,
                    datetime,
                    status,
                  },
                },
              },
              { new: true }
            )
              .then((list) => res.json(list))
              .catch((err) => console.log(err));
          } else {
            const newDate = new Deadline({
              name: "time",
              date: [
                {
                  buasri_id,
                  datetime,
                  status,
                },
              ],
            });
            newDate
              .save()
              .then((result_save) => res.json(result_save))
              .catch((err) => console.log(err));
          }
        });
      });
  };
  DeadlineAdd();
});
// Select Deadline Send
router.post("/select", (req, res) => {
  const { buasri_id } = req.body;
  // console.log("text " + text);
  const getTime = async () => {
    // DB Config
    const mongoose = require("mongoose");
    const db = config.get("mongoEResearch");

    // Connect MongoDB
    await mongoose
      .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        // Main User Model
        const SelectTime = require("../../models/Deadline");
        mongoose.set("useFindAndModify", false);
        SelectTime.aggregate([
          { $match: { name: "time" } },
          {
            $project: {
              _id: "$date._id",
              "date.datetime": 1,
              "date.status": 1,
            },
          },
          { $unwind: "$date" },
          {
            $group: {
              _id: "$date._id",
              datetime: { $last: "$date.datetime" },
              status: { $last: "$date.status" },
            },
          },
        ])
          .then((list) => res.json(list))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  getTime();
});

// Add Deadline Check
router.put("/add_check", auth, (req, res) => {
  console.log(req.body);
  const DeadlineCheckAdd = async () => {
    // DB Config
    const mongoose = require("mongoose");
    const db = config.get("mongoEResearch");

    // Connect Mongo
    await mongoose
      .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        // Deadline Model
        const Deadline = require("../../models/Deadline");
        const { buasri_id, datetime, status } = req.body;
        mongoose.set("useFindAndModify", false);
        Deadline.findOne({ name: "timecheck" }).then((name) => {
          if (name) {
            Deadline.findOneAndUpdate(
              { name: "timecheck" },
              {
                $push: {
                  date: {
                    buasri_id,
                    datetime,
                    status,
                  },
                },
              },
              { new: true }
            )
              .then((list) => res.json(list))
              .catch((err) => console.log(err));
          } else {
            const newDate = new Deadline({
              name: "timecheck",
              date: [
                {
                  buasri_id,
                  datetime,
                  status,
                },
              ],
            });
            newDate
              .save()
              .then((result_save) => res.json(result_save))
              .catch((err) => console.log(err));
          }
        });
      });
  };
  DeadlineCheckAdd();
});

// Send Deadline Check
router.post("/select_check", (req, res) => {
  console.log("text_check " + req);
  const { buasri_id } = req.body;
  const getTime = async () => {
    // DB Config
    const mongoose = require("mongoose");
    const db = config.get("mongoEResearch");

    // Connect MongoDB
    await mongoose
      .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        // Main User Model
        const SelectTime = require("../../models/Deadline");
        mongoose.set("useFindAndModify", false);
        SelectTime.aggregate([
          { $match: { name: "timecheck" } },
          {
            $project: {
              _id: "$date._id",
              "date.datetime": 1,
              "date.status": 1,
            },
          },
          { $unwind: "$date" },
          {
            $group: {
              _id: "$date._id",
              datetime: { $last: "$date.datetime" },
              status: { $last: "$date.status" },
            },
          },
        ])
          .then((list) => res.json(list))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  getTime();
});

module.exports = router;
