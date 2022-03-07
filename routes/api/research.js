const express = require("express");
const router = express.Router();
const config = require("config");
const auth = require("../../middleware/auth");

// เพิ่มข้อมูลงานวิจัย
router.put("/add", auth, (req, res) => {
  // console.log("เข้า add");
  // console.log(req.body);

  const listAdd = async () => {
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
        // Research Model
        const Research = require("../../models/User");
        const {
          buasri_id,
          firstname,
          lastname,
          position,
          article,
          type_name,
          request_number,
          register_number,
          level,
          journal_name,
          sub_level_1,
          sub_level_2,
          year,
          author,
          name,
          name_th,
          conference_name,
          conference_name_th,
          conf_country,
          conf_local,
          conf_year,
          conf_month,
          quartile,
          status,
          student,
          tags,
          file_name,
          file_path,
        } = req.body;
        mongoose.set("useFindAndModify", false);
        Research.findOneAndUpdate(
          { buasri_id },
          {
            $push: {
              research: {
                firstname,
                lastname,
                position,
                article,
                type_article: {
                  article,
                  type_name: type_name ? type_name : undefined,
                  request_number: request_number ? request_number : undefined,
                  register_number: register_number
                    ? register_number
                    : undefined,
                  journal_name: journal_name ? journal_name : undefined,
                },
                level,
                sub_level_1,
                sub_level_2,
                year,
                author,
                name,
                name_th: name_th ? name_th : undefined,
                conference: {
                  research_month: conf_month ? conf_month : undefined,
                  conf_name: conference_name ? conference_name : undefined,
                  conf_name_th: conference_name_th
                    ? conference_name_th
                    : undefined,
                  country: conf_country ? conf_country : undefined,
                  local_name: conf_local ? conf_local : undefined,
                },
                research_year: conf_year,
                quartile,
                student: student ? student.tag : undefined,
                tags: tags ? tags.tag : undefined,
                status: {
                  status,
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
          .then((researchdetail) => res.json(researchdetail))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  listAdd();
});

// Update งานวิจัย
router.post("/edit", auth, (req, res) => {
  console.log("เข้า Edit");
  console.log(req.body);
  const listUpdate = async () => {
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
        const Research = require("../../models/User");
        const {
          buasri_id,
          _id,
          year,
          level,
          level_sub1,
          level_sub2,
          article_type,
          author_type,
          research_name,
          research_name_th,
          research_year,

          quartile,
          note,
          tags,

          student,

          type_name,
          request_number,
          register_number,
          journal_name,
          research_month,
          conference_name,
          conference_name_th,
          conf_country,
          conf_local,

          file_name,
          file_path,

          status,
        } = req.body;
        console.log(req.body);
        mongoose.set("useFindAndModify", false);
        let ObjectId = require("mongoose").Types.ObjectId;
        Research.findOneAndUpdate(
          { buasri_id: buasri_id, "research._id": ObjectId(_id) },
          {
            $set: {
              "research.$.article": article_type,
              "research.$.level": level,
              "research.$.sub_level_1": level_sub1,
              "research.$.sub_level_2": level_sub2,
              "research.$.year": year,
              "research.$.author": author_type,
              "research.$.name": research_name,
              "research.$.name_th": research_name_th,
              "research.$.research_year": research_year,
              "research.$.quartile": quartile,
              "research.$.note": note,
              "research.$.student": student ? student.tag : undefined,
              "research.$.tags": tags ? tags.tag : undefined,
              "research.$.conference.$[].research_month":
                article_type === "CONFERENCE" ? research_month : undefined,
              "research.$.conference.$[].conf_name":
                article_type === "CONFERENCE" ? conference_name : undefined,
              "research.$.conference.$[].conf_name_th":
                article_type === "CONFERENCE" ? conference_name_th : undefined,
              "research.$.conference.$[].local_name":
                article_type === "CONFERENCE" ? conf_local : undefined,
              "research.$.conference.$[].country":
                article_type === "CONFERENCE" ? conf_country : undefined,
              "research.$.type_article.$[].type_name":
                article_type === "PATENT" ||
                article_type === "PETTY-PATENT" ||
                article_type === "COPYRIGHT"
                  ? type_name
                  : undefined,
              "research.$.type_article.$[].request_number":
                article_type === "PATENT" ||
                article_type === "PETTY-PATENT" ||
                article_type === "COPYRIGHT"
                  ? request_number
                  : undefined,
              "research.$.type_article.$[].register_number":
                article_type === "PATENT" ||
                article_type === "PETTY-PATENT" ||
                article_type === "COPYRIGHT"
                  ? register_number
                  : undefined,
              "research.$.type_article.$[].journal_name":
                article_type === "JOURNAL" ? journal_name : undefined,
              "research.$.upload.file_name": file_name,
              "research.$.upload.file_path": file_path,
              "research.$.status.status": status,
            },
          },
          { new: true }
        )
          .then((researchdetail) => res.json(researchdetail))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  listUpdate();
});

// Update Status Committee งานวิจัย
router.post("/status_committee", (req, res) => {
  const statusUpdate = async () => {
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
        const Research = require("../../models/User");
        const { buasri_id, committee, id, status, note } = req.body;
        let ObjectId = require("mongoose").Types.ObjectId;
        mongoose.set("useFindAndModify", false);
        Research.findOneAndUpdate(
          { buasri_id, "research._id": ObjectId(id) },
          {
            $set: {
              "research.$.status.status": status,
              "research.$.status.committee": committee,
              "research.$.status.note": note,
            },
          },
          { new: true }
        )
          .then((statusupdate) => res.json(statusupdate))
          .catch((err) => console.log(err));
      });
  };
  statusUpdate();
});

// ยังไม่เสร็จ
// Update Status Admin งานวิจัย
router.post("/status_admin", (req, res) => {
  const statusUpdate = async () => {
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
        const Research = require("../../models/User");
        const { buasri_id, admin, id, status, note } = req.body;
        let ObjectId = require("mongoose").Types.ObjectId;
        mongoose.set("useFindAndModify", false);
        Research.findOneAndUpdate(
          { buasri_id, "research._id": ObjectId(id) },
          {
            $set: {
              "research.$.status.status": status,
              "research.$.status.admin": admin,
              "research.$.status.note": note,
            },
          }
        )
          .then((statusupdate) => res.json(statusupdate))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  statusUpdate();
});

// Get All list in User
router.post("/user", auth, (req, res) => {
  const ListUser = async () => {
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
        const List = require("../../models/User");
        const { buasri_id } = req.body;
        List.aggregate([
          { $match: { buasri_id } },
          {
            $project: {
              "research._id": 1,
              buasri_id: 1,
              "research.name": 1,
              "research.status": 1,
              "research.createdAt": 1,
            },
          },
          { $unwind: "$research" },
          {
            $group: {
              _id: "$research._id",
              buasri_id: { $last: "$buasri_id" },
              name: { $last: "$research.name" },
              status: { $last: "$research.status.status" },
              created: { $last: "$research.createdAt" },
            },
          },
          {
            $sort: { created: 1 },
          },
        ])
          .then((list) => {
            res.json(list);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  ListUser();
});
// Get All list in Admin
router.post("/admin", auth, (req, res) => {
  const ListAdmin = async () => {
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
        const List = require("../../models/User");
        List.aggregate([
          {
            $project: {
              "research._id": 1,
              buasri_id: 1,
              dep: 1,
              "research.firstname": 1,
              "research.lastname": 1,
              "research.name": 1,
              "research.status": 1,
              "research.createdAt": 1,
            },
          },
          { $unwind: "$research" },
          {
            $group: {
              _id: "$research._id",
              buasri_id: { $last: "$buasri_id" },
              department: { $last: "$dep" },
              firstname: { $last: "$research.firstname" },
              lastname: { $last: "$research.lastname" },
              name: { $last: "$research.name" },
              status: { $last: "$research.status.status" },
              created: { $last: "$research.createdAt" },
            },
          },
          {
            $sort: { created: 1 },
          },
        ])
          .then((list) => {
            res.json(list);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  ListAdmin();
});

// Get All list in Committee
router.post("/committee", auth, (req, res) => {
  const ListCommittee = async () => {
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
        const List = require("../../models/User");
        const { dep } = req.body;
        List.aggregate([
          { $match: { dep } },
          {
            $project: {
              "research._id": 1,
              buasri_id: 1,
              "research.firstname": 1,
              "research.lastname": 1,
              "research.name": 1,
              "research.status": 1,
              "research.createdAt": 1,
            },
          },
          { $unwind: "$research" },
          {
            $group: {
              _id: "$research._id",
              buasri_id: { $last: "$buasri_id" },
              firstname: { $last: "$research.firstname" },
              lastname: { $last: "$research.lastname" },
              name: { $last: "$research.name" },
              status: { $last: "$research.status.status" },
              created: { $last: "$research.createdAt" },
            },
          },
          {
            $sort: { created: 1 },
          },
        ])
          .then((list) => {
            res.json(list);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  ListCommittee();
});

// ยังใช้ไม่ได้
// Get list with limited
router.post("/testtwoindex", (req, res) => {
  const get2index = async () => {
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
        const List = require("../../models/User");
        const { dep, page } = req.body;
        const pageskip = (page - 1) * 5;
        List.aggregate([
          { $match: { dep } },
          {
            $project: {
              "research._id": 1,
              buasri_id: 1,
              "research.name": 1,
              "research.status": 1,
              "research.createdAt": 1,
            },
          },
          { $unwind: "$research" },
          {
            $group: {
              _id: "$research._id",
              buasri_id: { $last: "$buasri_id" },
              name: { $last: "$research.name" },
              status: { $last: "$research.status.status" },
              created: { $last: "$research.createdAt" },
            },
          },
          {
            $sort: { created: 1 },
          },
          { $skip: pageskip },
          { $limit: 5 },
        ])
          .then((list) => {
            res.json(list);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  get2index();
});

// Get detail in select
router.post("/select", auth, (req, res) => {
  // console.log(JSON.stringify(req.body));
  const selectList = async () => {
    //  DB Config
    const mongoose = require("mongoose");
    const db = config.get("mongoEResearch");

    //   Connect Mongo
    await mongoose
      .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        const List = require("../../models/User");
        let ObjectId = require("mongoose").Types.ObjectId;
        const { buasri_id, id } = req.body;
        List.aggregate([
          { $match: { buasri_id } },
          {
            $unwind: "$research",
          },
          { $unwind: "$research._id" },
          {
            $group: {
              _id: "$research._id",
              list_add: {
                $push: {
                  list_buasri: "$buasri_id",
                  list_email: "$email",
                  list_dep: "$dep",
                  list_firstname: "$research.firstname",
                  list_lastname: "$research.lastname",
                  list_position: "$research.position",
                  list_research_name: "$research.name",
                  list_research_name_th: "$research.name_th",
                  list_article: "$research.article",
                  list_article_type: "$research.type_article",
                  list_year: "$research.year",
                  list_research_year: "$research.research_year",
                  list_quartile: "$research.quartile",
                  list_author: "$research.author",
                  list_level: "$research.level",
                  list_sublvl1: "$research.sub_level_1",
                  list_sublvl2: "$research.sub_level_2",
                  list_conf: "$research.conference",
                  list_student: "$research.student",
                  list_tags: "$research.tags",
                  list_status: "$research.status.status",
                  list_note: "$research.status.note",
                  list_committee: "$research.status.committee",
                  list_admin: "$research.status.admin",
                  list_file_name: "$research.upload.file_name",
                  list_file_path: "$research.upload.file_path",
                  list_created: "$research.createdAt",
                },
              },
            },
          },
          { $unwind: "$list_add" },
          {
            $group: {
              _id: "$_id",
              buasri_id: { $last: "$list_add.list_buasri" },
              email: { $last: "$list_add.list_email" },
              dep: { $last: "$list_add.list_dep" },
              firstname: { $last: "$list_add.list_firstname" },
              lastname: { $last: "$list_add.list_lastname" },
              position: { $last: "$list_add.list_position" },
              research_name: { $last: "$list_add.list_research_name" },
              research_name_th: { $last: "$list_add.list_research_name_th" },
              article_type: { $last: "$list_add.list_article" },
              article_type_name: {
                $last: "$list_add.list_article_type",
              },
              conf: "$list_add.list_conf"
                ? {
                    $last: "$list_add.list_conf",
                  }
                : undefined,
              year: { $last: "$list_add.list_year" },
              research_year: { $last: "$list_add.list_research_year" },
              quartile: { $last: "$list_add.list_quartile" },
              author_type: { $last: "$list_add.list_author" },
              level: { $last: "$list_add.list_level" },
              level_sub1: { $last: "$list_add.list_sublvl1" },
              level_sub2: { $last: "$list_add.list_sublvl2" },
              student: { $last: "$list_add.list_student" },
              tags: { $last: "$list_add.list_tags" },
              status: { $last: "$list_add.list_status" },
              note: { $last: "$list_add.list_note" },
              committee: { $last: "$list_add.list_committee" },
              admin: { $last: "$list_add.list_admin" },
              file_name: { $last: "$list_add.list_file_name" },
              file_path: { $last: "$list_add.list_file_path" },
              createdAt: { $last: "$list_add.list_created" },
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
  selectList();
});
module.exports = router;
