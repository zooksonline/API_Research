const express = require("express");
const router = express.Router();
const config = require("config");
const auth = require("../../middleware/auth");

router.post("/report_admin", auth, (req, res) => {
  const ReportAdmin = async () => {
    //  DB Config
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
        const report = require("../../models/User");
        report
          .aggregate([
            {
              $project: {
                buasri_id: 1,
                dep: 1,
                "research._id": 1,
                "research.firstname": 1,
                "research.lastname": 1,
                "research.position": 1,
                "research.article": 1,
                "research.type_article": 1,
                "research.level": 1,
                "research.sub_level_1": 1,
                "research.sub_level_2": 1,
                "research.year": 1,
                "research.research_year": 1,
                "research.author": 1,
                "research.name": 1,
                "research.name_th": 1,
                "research.conference": 1,
                "research.quartile": 1,
                "research.student": 1,
                "research.tags": 1,
                "research.status": 1,
              },
            },
            { $unwind: "$research" },
            { $unwind: "$research.type_article" },
            {
              $group: {
                buasri_id: { $last: "$buasri_id" },
                department: { $last: "$dep" },
                _id: "$research._id",
                firstname: { $last: "$research.firstname" },
                lastname: { $last: "$research.lastname" },
                position: { $last: "$research.position" },
                article: { $last: "$research.article" },
                level: { $last: "$research.level" },
                sub_level_1: { $last: "$research.sub_level_1" },
                sub_level_2: { $last: "$research.sub_level_2" },
                year: { $last: "$research.year" },
                research_year: { $last: "$research.research_year" },
                author: { $last: "$research.author" },
                name: { $last: "$research.name" },
                name_th: { $last: "$research.name_th" },
                quartile: { $last: "$research.quartile" },
                student: { $last: "$research.student" },
                tags: { $last: "$research.tags.text" },
                status: { $last: "$research.status" },
              },
            },
            {
              $sort: { created: 1 },
            },
          ])
          .then((report) => {
            res.json(report);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  ReportAdmin();
});

router.post("/report_committee", auth, (req, res) => {
  const ReportCommittee = async () => {
    //  DB Config
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
        const report = require("../../models/User");
        const { dep } = req.body;
        report
          .aggregate([
            { $match: { dep } },
            {
              $project: {
                buasri_id: 1,
                dep: 1,
                "research._id": 1,
                "research.firstname": 1,
                "research.lastname": 1,
                "research.position": 1,
                "research.article": 1,
                "research.type_article": 1,
                "research.level": 1,
                "research.sub_level_1": 1,
                "research.sub_level_2": 1,
                "research.year": 1,
                "research.research_year": 1,
                "research.author": 1,
                "research.name": 1,
                "research.name_th": 1,
                "research.conference": 1,
                "research.quartile": 1,
                "research.student": 1,
                "research.tags": 1,
                "research.status": 1,
              },
            },
            { $unwind: "$research" },
            { $unwind: "$research.type_article" },
            {
              $group: {
                buasri_id: { $last: "$buasri_id" },
                department: { $last: "$dep" },
                _id: "$research._id",
                firstname: { $last: "$research.firstname" },
                lastname: { $last: "$research.lastname" },
                position: { $last: "$research.position" },
                article: { $last: "$research.article" },
                level: { $last: "$research.level" },
                sub_level_1: { $last: "$research.sub_level_1" },
                sub_level_2: { $last: "$research.sub_level_2" },
                year: { $last: "$research.year" },
                research_year: { $last: "$research.research_year" },
                author: { $last: "$research.author" },
                name: { $last: "$research.name" },
                name_th: { $last: "$research.name_th" },
                quartile: { $last: "$research.quartile" },
                student: { $last: "$research.student" },
              },
            },
            {
              $sort: { created: 1 },
            },
          ])
          .then((report) => {
            res.json(report);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  ReportCommittee();
});

router.post("/report_user", auth, (req, res) => {
  const ReportUser = async () => {
    //  DB Config
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
        const report = require("../../models/User");
        const { buasri_id } = req.body;
        report
          .aggregate([
            { $match: { buasri_id } },
            {
              $project: {
                buasri_id: 1,
                dep: 1,
                "research._id": 1,
                "research.firstname": 1,
                "research.lastname": 1,
                "research.position": 1,
                "research.article": 1,
                "research.type_article": 1,
                "research.level": 1,
                "research.sub_level_1": 1,
                "research.sub_level_2": 1,
                "research.year": 1,
                "research.research_year": 1,
                "research.author": 1,
                "research.name": 1,
                "research.name_th": 1,
                "research.conference": 1,
                "research.quartile": 1,
                "research.student": 1,
                "research.tags": 1,
                "research.status": 1,
              },
            },
            { $unwind: "$research" },
            { $unwind: "$research.type_article" },
            {
              $group: {
                buasri_id: { $last: "$buasri_id" },
                department: { $last: "$dep" },
                _id: "$research._id",
                firstname: { $last: "$research.firstname" },
                lastname: { $last: "$research.lastname" },
                position: { $last: "$research.position" },
                article: { $last: "$research.article" },
                level: { $last: "$research.level" },
                sub_level_1: { $last: "$research.sub_level_1" },
                sub_level_2: { $last: "$research.sub_level_2" },
                year: { $last: "$research.year" },
                research_year: { $last: "$research.research_year" },
                author: { $last: "$research.author" },
                name: { $last: "$research.name" },
                name_th: { $last: "$research.name_th" },
                quartile: { $last: "$research.quartile" },
                student: { $last: "$research.student" },
              },
            },
            {
              $sort: { created: 1 },
            },
          ])
          .then((report) => {
            res.json(report);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  ReportUser();
});

module.exports = router;
