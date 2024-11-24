const mongoose = require("mongoose");

const dbURI = process.env.DATABASE;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("successfully connected to MongoDB");
  } catch (error) {
    console.log("error connecting to db", error);
  }
};

module.exports = connectDB;
