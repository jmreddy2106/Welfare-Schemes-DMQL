const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");
// db.sequelize.sync();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine to ejs
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("./public"));

// Import routes
const routes = require("./routes");
app.use("/", routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
