const express = require("express");
const router = express.Router();
const config = require("config");
const auth = require("../../../middleware/auth");

// เพิ่ม logs v2
router.post("/add", auth, (req, res) => {
  const logAdd = async () => {
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
        const LogResearch = require("../../../models/Log");
        const {
          buasri_id,
          email,
          research_id,
          firstname,
          lastname,
          position,
          article,
          type_name,
          request_number,
          register_number,
          journal_name,
          level,
          sub_level_1,
          sub_level_2,
          year,
          research_year,
          author,
          name,
          name_th,
          conference_month,
          conference_name,
          conference_name_th,
          conference_country,
          conference_local,
          quartile,
          status,
          note,
          tags,
          file_name,
          file_path,
        } = req.body;
        mongoose.set("useFindAndModify", false);
        const newLogResearch = new LogResearch({
          buasri_id,
          email,
          research_id,
          firstname,
          lastname,
          position,
          article,
          type_name,
          request_number,
          register_number,
          journal_name,
          level,
          sub_level_1,
          sub_level_2,
          year,
          research_year,
          author,
          name,
          name_th,
          conference_month,
          conference_name,
          conference_name_th,
          conference_country,
          conference_local,
          quartile,
          status,
          note,
          tags: tags ? tags.tag : undefined,
          file_name,
          file_path,
        });
        newLogResearch
          .save()
          .then((logUpdate) => {
            res.json(logUpdate);
          })
          .catch((err) => console.log(err));
        // LogResearch.
      });
  };
  logAdd();
});

router.post("/select", auth, (req, res) => {
  //   console.log(req.body);
  const getLog = async () => {
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
        const SelectLog = require("../../../models/Log");
        mongoose.set("useFindAndModify", false);
        SelectLog.aggregate([
          {
            $project: {
              buasri_id: 1,
              research_id: 1,
              article: 1,
              type_name: 1,
              request_number: 1,
              register_number: 1,
              journal_name: 1,
              level: 1,
              sub_level_1: 1,
              sub_level_2: 1,
              year: 1,
              conf_year: 1,
              author: 1,
              name: 1,
              name_th: 1,
              conf_month: 1,
              conf_name: 1,
              conf_name_th: 1,
              country: 1,
              local_name: 1,
              quartile: 1,
              tags_id: 1,
              tags_text: 1,
              status: 1,
              note: 1,
              file_name: 1,
              file_path: 1,
            },
          },
          // { $unwind: "$log" },
          // {
          //   $group: {
          //     research_id: "$id",
          //     //     buasri_id: "$log.buasri_id",
          //   },
          // },
        ])
          .then((list) => res.json(list))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  getLog();
});

// project log
router.post("/projectadd", auth, (req, res) => {
  const logAdd = async () => {
    // DB Config
    const mongoose = require("mongoose");
    const db = config.get("mongoEResearch");
    // console.log("in logs project!!!");
    // Connect Mongo
    await mongoose
      .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        const LogProjectResearch = require("../../../models/project/Log");
        const {
          buasri_id,
          email,
          research_id,
          firstname,
          lastname,
          position,
          project_name,
          funds_type,
          funds,
          project_type,
          datetime,
          status,
          note,
          file_name,
          file_path,
        } = req.body;
        mongoose.set("useFindAndModify", false);
        const newLogProjectResearch = new LogProjectResearch({
          buasri_id,
          email,
          research_id,
          firstname,
          lastname,
          position,
          project_name,
          funds_type,
          funds,
          project_type,
          datetime,
          status,
          note,
          file_name,
          file_path,
        });
        newLogProjectResearch
          .save()
          .then((logUpdate) => {
            res.json(logUpdate);
          })
          .catch((err) => console.log(err));
      });
  };
  logAdd();
});

module.exports = router;
