const express = require("express");
const router = express.Router();
const slugify = require("slugify");

const Article = require("./Article");
const Category = require("../categories/Category");

router.get("/articles", (req, res) => {
  res.send("articles");
});

router.get("/admin/articles/new", (req, res) => {
  Category.findAll().then((categories) => {
    res.render("admin/articles/new", {
      title: "Novo Artigo",
      categories,
    });
  });
});

module.exports = router;
