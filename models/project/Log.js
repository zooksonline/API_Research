const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const position_enum = ["ADMIN", "COMMITTEE", "USER"];
const status_enum = [
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

const LogProjectSchema = new Schema(
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
    },
    lastname: {
      type: String,
    },
    position: {
      type: String,
      enum: position_enum,
    },
    project_name: {
      type: String,
    },
    funds_type: {
      type: String,
    },
    funds: {
      type: Number,
    },
    project_type: {
      type: String,
    },
    datetime: {
      type: Date,
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
  },
  { timestamps: true }
);

module.exports = LogProject = mongoose.model("logproject", LogProjectSchema);
