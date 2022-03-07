const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DateSchema = new Schema({
  buasri_id: {
    type: String,
    required: true,
  },
  datetime: {
    type: Date,
  },
  status: {
    type: String,
  },
});

const DateCheckShema = new Schema({
  buasri_id: {
    type: String,
    required: true,
  },
  datetime: {
    type: Date,
  },
  status: {
    type: String,
  },
});

const DeadlineSchema = new Schema({
  name: {
    type: String,
  },
  date: [DateSchema],
  datecheck: [DateCheckShema],
});

module.exports = Deadline = mongoose.model("deadline", DeadlineSchema);
