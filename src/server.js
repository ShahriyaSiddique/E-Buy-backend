const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const adminAuthRoute = require("./routes/admin/auth");
const categoryRoute = require("./routes/category");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const path = require("path");
// const bodyParser = require("body-parser");  // deprecated

// create express app
const app = express();

// initialize dotenv
env.config();

// initialize mongodb
const mongodbString = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONOGODB_PASS}@nodetutorial.7rhjr.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;
// const mongodbString = `mongodb://localhost:27017/${process.env.MONGODB_DATABASE}`;
mongoose
  .connect(mongodbString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database Connected!!!");
  });

app.use(express.json());
// app.use(bodyParser()); // deprecated
app.use("/public", express.static(path.join(__dirname, "./uploads/")));

app.use("/api", authRoute);
app.use("/api", adminAuthRoute);
app.use("/api", categoryRoute);
app.use("/api", productRoute);
app.use("/api", cartRoute);
app.use(
  "/",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { showExplorer: true })
);

app.listen(process.env.PORT, () => {
  console.log(`server is running at ${process.env.PORT}`);
});
