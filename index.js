const express = require("express");
const app = express();
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const postRoute = require("./routes/posts")

//connect to db
dotenv.config();


mongoose.connect(
  process.env.MONGO_URL,
  { useNewURLParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to Mongodb");
  }
);

//middelwares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//routes
app.use("/api/auth" , authRoute)
app.use("/api/users" , userRoute)
app.use("/api/posts" , postRoute)

app.listen(5000, () => {
  console.log("Backend is running");
});
