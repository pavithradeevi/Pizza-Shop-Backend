const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const router = express.Router();
dotenv.config();
const userRoute = require('./routes/userRoutes')
const pizzaRoute = require('./routes/pizzaRoute')
const orderRoute = require('./routes/orderRoute');

require("colors");
const morgan = require("morgan");

const app = express();
app.use(
    cors({
      origin: "*",
    })
  );

  router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//middlewares
app.use(express.json());
app.use(morgan("dev"));


app.use('/api/users',userRoute)
app.use('/api/pizzas',pizzaRoute)
app.use('/api/orders',orderRoute)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  } else {
    app.get("/", (req, res) => {
      res.send("<h1>Hello All!welcome to pizza Shop</h1>");
    });
  }

  const uri = process.env.MONGO_URL;
  mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected Successfully"))
  .catch((error) => console.error("MongoDB connection failed:", error.message));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(
    `Server Running On ${process.env.NODE_ENV} mode on port no ${process.env.PORT}`
    
  );
});