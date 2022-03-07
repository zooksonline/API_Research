const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const position_enum = ["ADMIN", "COMMITTEE", "USER"];
const status_enum = ["WAITING", "WAITINGADMIN", "REJECT", "EDIT", "APPROVED"];
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

const TagsSchema = new Schema({
  id: {
    type: String,
  },
  text: {
    type: String,
  },
});

// Log Schema
const LogSchema = new Schema(
  {
    buasri_id: {
      type: String,
    },
    email: {
      type: String,
    },
    research_id: {
      type: String,
    },
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
    },
    article: {
      type: String,
      enum: article_enum,
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
    level: {
      type: String,
    },
    sub_level_1: {
      type: String,
    },
    sub_level_2: {
      type: String,
    },
    year: {
      type: Number,
    },
    research_year: {
      type: Number,
    },
    author: {
      type: String,
      enum: author_enum,
    },
    name: {
      type: String,
    },
    conference_month: {
      type: String,
    },
    conference_name: {
      type: String,
    },
    conference_country: {
      type: String,
    },
    conference_local: {
      type: String,
    },
    quartile: {
      type: String,
      enum: quartile_enum,
    },
    status: {
      type: String,
      enum: status_enum,
      default: "WAITING",
    },
    note: {
      type: String,
    },
    file_name: {
      type: String,
    },
    file_path: {
      type: String,
    },
    tags: [TagsSchema],
  },
  { timestamps: true }
);

module.exports = Log = mongoose.model("log", LogSchema);
