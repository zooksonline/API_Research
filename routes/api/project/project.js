const express = require("express");
const router = express.Router();
const config = require("config");
const auth = require("../../../middleware/auth");

// เพิ่มข้อมูลโครงการ
router.put("/add", (req, res) => {
  const projectAdd = async () => {
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
        ResearchProject = require("../../../models/User");
        const {
          buasri_id,
          firstname,
          lastname,
          position,
          project_name,
          funds_type,
          funds,
          project_type,
          datetime,
          project_status,
          file_name,
          file_path,
        } = req.body;
        mongoose.set("useFindAndModify", false);
        ResearchProject.findOneAndUpdate(
          { buasri_id },
          {
            $push: {
              project: {
                firstname,
                lastname,
                position,
                project_name,
                funds_type,
                funds,
                project_type,
                datetime,
                status: {
                  project_status,
                },
                upload: {
                  file_name,
                  file_path,
                },
              },
            },
          },
          { new: true }
        )
          .then((projectdetail) => res.json(projectdetail))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  projectAdd();
});

router.post("/count", (req, res) => {
  const CountProject = async () => {
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
        ResearchProject = require("../../../models/User");
        const { buasri_id } = req.body;
        ResearchProject.aggregate([
          { $match: { buasri_id } },
          {
            $project: {
              "project._id": 1,
              buasri_id: 1,
              "project.project_name": 1,
            },
          },
          { $unwind: "$project" },
          { $group: { _id: null, count: { $sum: 1 } } },
        ])
          .then((project_list) => {
            res.json(project_list);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  CountProject();
});

router.post("/list_user", auth, (req, res) => {
  const ListUserProject = async () => {
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
        ResearchProject = require("../../../models/User");
        const { buasri_id } = req.body;
        ResearchProject.aggregate([
          { $match: { buasri_id } },
          {
            $project: {
              "project._id": 1,
              buasri_id: 1,
              "project.project_name": 1,
              "project.funds": 1,
              "project.status": 1,
            },
          },
          { $unwind: "$project" },
          {
            $group: {
              _id: "$project._id",
              buasri_id: { $last: "$buasri_id" },
              name: { $last: "$project.project_name" },
              funds: { $last: "$project.funds" },
              status: { $last: "$project.status.status" },
            },
          },
          {
            $sort: { created: 1 },
          },
        ])
          .then((project_list) => {
            res.json(project_list);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  ListUserProject();
});

// Get detail in select
router.post("/select", auth, (req, res) => {
  const selectProject = async () => {
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
        const Project = require("../../../models/User");
        let ObjectId = require("mongoose").Types.ObjectId;
        const { buasri_id, id } = req.body;
        Project.aggregate([
          { $match: { buasri_id } },
          {
            $unwind: "$project",
          },
          {
            $unwind: "$project._id",
          },
          {
            $group: {
              _id: "$project._id",
              project_add: {
                $push: {
                  project_buasri: "$buasri_id",
                  project_email: "$email",
                  project_dep: "$dep",
                  project_firstname: "$project.firstname",
                  project_lastname: "$project.lastname",
                  project_position: "$project.position",
                  project_name: "$project.project_name",
                  project_type: "$project.project_type",
                  project_funds_type: "$project.funds_type",
                  project_funds: "$project.funds",
                  project_datetime: "$project.datetime",
                  project_status: "$project.status.status",
                  project_status_note: "$project.status.note",
                  project_committe: "$project.status.committe",
                  project_admin: "$project.status.admin",
                  project_file_name: "$project.upload.file_name",
                  project_file_path: "$project.upload.file_path",
                },
              },
            },
          },
          { $unwind: "$project_add" },
          {
            $group: {
              _id: "$_id",
              buasri_id: { $last: "$project_add.project_buasri" },
              email: { $last: "$project_add.project_email" },
              dep: { $last: "$project_add.project_dep" },
              firstname: { $last: "$project_add.project_firstname" },
              lastname: { $last: "$project_add.project_lastname" },
              position: { $last: "$project_add.project_position" },
              project_name: { $last: "$project_add.project_name" },
              project_type: { $last: "$project_add.project_type" },
              funds: { $last: "$project_add.project_funds" },
              funds_type: { $last: "$project_add.project_funds_type" },
              datetime: { $last: "$project_add.project_datetime" },
              status: { $last: "$project_add.project_status" },
              note: { $last: "$project_add.project_status_note" },
              committe: { $last: "$project_add.project_committe" },
              admin: { $last: "$project_add.project_admin" },
              file_name: { $last: "$project_add.project_file_name" },
              file_path: { $last: "$project_add.project_file_path" },
            },
          },
          { $match: { _id: ObjectId(id) } },
        ])
          .then((detail) => {
            res.json(detail);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  selectProject();
});

module.exports = router;
