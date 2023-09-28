const express = require("express");
const app = express();
const port = 3000;
//import library CORS
const cors = require("cors");

//use cors
app.use(cors());

//import body parser
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Import route petugas
const petugasRouter = require("./routes/petugas");
app.use("/api/petugas", petugasRouter);

// Import route produk
const produkRouter = require("./routes/produk");
app.use("/api/produk", produkRouter);

// use route produk di Express
app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`);
});
