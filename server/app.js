require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./db/conn");
const router = require("./routes/Router");

const port = process.env.PORT || 8005;
connectDB();

app.use(express.json());
app.use(cors());
app.use(router);

app.use("/uploads", express.static("./uploads"));

app.listen(port, async (req, res) => {
  console.log(`server started at port: ${port}`);
});
