const express = require("express");

const app = express();

require("dotenv").config();
//view engine
app.set("view engine", "ejs");

//arquivos estáticos
app.use(express.static("public"));

//body parser
app.use(express.urlencoded({ extended: false }));

// json
app.use(express.json());

// //rotas
// app.use(routes);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(process.env.PORT, () => console.log("👀✔"));
