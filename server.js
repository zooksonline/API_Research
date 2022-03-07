const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();

const config = require("config");
const port = config.get("portENV");

// CORS
app.use(cors());
// Body-Parser Middleware
app.use(express.json());
// file Upload
app.use(fileUpload());

auth = require("./routes/api/auth");
app.use("/api/user", auth);

list = require("./routes/api/research");
app.use("/api/list", list);

log = require("./routes/api/logs/log");
app.use("/api/logs", log);

upload_file = require("./routes/api/uploadfile");
app.use("/api/upload", upload_file);

get_email = require("./routes/api/email/get_email");
app.use("/api/email/get", get_email);

deadline = require("./routes/api/deadline");
app.use("/api/date", deadline);

report = require("./routes/api/report");
app.use("/api/report", report);

project = require("./routes/api/project/project");
app.use("/api/project", project);

// Load Image
app.use("/uploads", express.static("./uploads"));

app.listen(port, () => console.log(`Server working at Port ${port}`));
