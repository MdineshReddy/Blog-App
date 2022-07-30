const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/UserRoutes");

require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Handle Routes
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});
app.use("/api/users", userRouter);

const PORT = process.env.PORT || 5000;

// Connect to DB and start the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`Connected to Database`);
    app.listen(PORT, () => {
      console.log(`Server listening on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
