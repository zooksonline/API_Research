const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const position_enum = ["ADMIN", "COMMITTEE", "USER", "HR"];
const status_enum = ["WAITING", "WAITINGADMIN", "REJECT", "EDIT", "APPROVED"];
const status_project_enum = [
  "WAITING",
  "ACCEPT-PROJECT",
  "CONSIDERING",
  "REQUEST-ADDITIONAL",
  "WAITING-FOR-REVIEW",
  "CONTRACT-IN-PROGRESS",
  "WAITING-FOR-PAY",
  "IN-THE-PROJECT",
  "EXTENDING",
  "END-OF-PROJECT",
  "CANCEL",
  "DRAFT",
  "DELETE",
];
const article_enum = [
  "CONFERENCE",
  "JOURNAL",
  "PETTY-PATENT",
  "PATENT",
  "COPYRIGHT",
];
const author_enum = [
  "AUTHOR",
  "CO-AUTHOR",
  "FIRST-AUTHOR",
  "FIRST-AUTHOR-AND-AUTHOR",
];
const quartile_enum = ["", "Q1", "Q2", "Q3", "Q4"];

// Create Schema
//////////////////////////////////////////////
// Student Shema
const StudentSchema = new Schema({
  id: {
    type: String,
  },
  text: {
    type: String,
  },
});

// Tags Schema
const TagsSchema = new Schema({
  id: {
    type: String,
  },
  text: {
    type: String,
  },
});

// Conference Schema
const ConferenceSchema = new Schema({
  research_month: {
    type: String,
  },
  conf_name: {
    type: String,
  },
  conf_name_th: {
    type: String,
  },
  country: {
    type: String,
  },
  local_name: {
    type: String,
  },
});

// TypeArticle Schema
const TypeArticleSchema = new Schema({
  acticle: {
    enum: article_enum,
    type: String,
  },
  type_name: {
    type: String,
  },
  request_number: {
    type: String,
  },
  register_number: {
    type: String,
  },
  journal_name: {
    type: String,
  },
});

// Research Schema
const ResearchSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      enum: position_enum,
      required: true,
    },
    article: {
      type: String,
      enum: article_enum,
      required: true,
    },
    type_article: [TypeArticleSchema],
    level: {
      type: String,
      required: true,
    },
    sub_level_1: {
      type: String,
      required: true,
    },
    sub_level_2: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    research_year: {
      type: Number,
    },
    author: {
      type: String,
      enum: author_enum,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    name_th: {
      type: String,
    },
    conference: [ConferenceSchema],
    quartile: {
      type: String,
      enum: quartile_enum,
    },
    student: [StudentSchema],
    tags: [TagsSchema],
    status: {
      updated: {
        type: Date,
        default: Date.now,
      },
      status: {
        type: String,
        enum: status_enum,
        default: "WAITING",
      },
      committee: {
        type: String,
      },
      admin: {
        type: String,
      },
      note: {
        type: String,
      },
    },
    upload: {
      updated: {
        type: Date,
        default: Date.now,
      },
      file_name: {
        type: String,
      },
      file_path: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

// ResearchProject
const ResearchProjectSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    enum: position_enum,
    required: true,
  },
  project_name: {
    type: String,
    required: true,
  },
  funds_type: {
    type: String,
    required: true,
  },
  funds: {
    type: Number,
    required: true,
  },
  project_type: {
    type: String,
    required: true,
  },
  datetime: {
    type: Date,
    required: true,
  },
  status: {
    updated: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: status_project_enum,
      default: "WAITING",
    },
    committe: {
      type: String,
    },
    admin: {
      type: String,
    },
    note: {
      type: String,
    },
  },
  upload: {
    updated: {
      type: Date,
      default: Date.now,
    },
    file_name: {
      type: String,
    },
    file_path: {
      type: String,
    },
  },
});
// User
const UserSchema = new Schema(
  {
    buasri_id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    dep: {
      type: String,
      required: true,
    },
    research: [ResearchSchema],
    project: [ResearchProjectSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("user", UserSchema);
