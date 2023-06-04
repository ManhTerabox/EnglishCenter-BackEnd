const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const initDb = require("./helpers/db").initDb;

const StudentRoutes = require("./routes/student.routes");
const TeacherRoutes = require("./routes/teacher.routes");
const ClassRoutes = require("./routes/class.routes");
const SubjectRoutes = require("./routes/Subject.routes");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.use("/api/v1", StudentRoutes);
app.use("/api/v1", TeacherRoutes);
app.use("/api/v1", ClassRoutes);
app.use("/api/v1", SubjectRoutes);

app.use((error, req, res, next) => {
  const errorMessage = error.message ? error.message : "something went wrong";
  const errorStatusCode = error.statusCode;

  res.status(errorStatusCode).json({ error: errorMessage });
});

initDb((error, client) => {
  if (error) {
    console.log("error happen: " + error);
  } else {
    app.listen(port, () => {
      console.log("app listened");
    });
  }
});
