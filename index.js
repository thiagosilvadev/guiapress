const express = require("express");
const app = express();
require("dotenv").config();

const connection = require("./database/database");

const CategoriesController = require("./categories/CategoriesController");
const ArticlesController = require("./articles/ArticlesController");
const Category = require("./categories/Category");
const Article = require("./articles/Article");

connection
  .authenticate()
  .then(() => {
    console.log("Sucesso ✔");
  })
  .catch((error) => console.log(error));

//view engine
app.set("view engine", "ejs");

//arquivos estáticos
app.use(express.static("public"));

//body parser
app.use(express.urlencoded({ extended: false }));

// json
app.use(express.json());

// //rotas
app.use("/", CategoriesController);
app.use("/", ArticlesController);

app.listen(process.env.PORT, () => console.log("👀✔"));
