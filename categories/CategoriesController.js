const express = require("express");
const slugify = require("slugify");
const router = express.Router();

const Category = require("./Category");

router.get("/admin/categories/new", (req, res) => {
  res.render("admin/categories/new", {
    title: "Nova Categoria",
  });
});

router.post("/categories/save", (req, res) => {
  const { title } = req.body;
  console.log(title);
  if (title !== undefined && title !== "") {
    Category.create({
      title,
      slug: slugify(title, {
        lower: true,
      }),
    }).then(() => res.redirect("/admin/categories/"));
  } else {
    res.redirect("/admin/categories/new");
  }
});

router.post("/categories/delete", (req, res) => {
  const { id } = req.body;

  if (id !== undefined && !isNaN(id)) {
    Category.destroy({
      where: {
        id,
      },
    }).then(() => res.redirect("/admin/categories/"));

    res.redirect;
  } else {
    res.redirect("/admin/categories/");
  }
});

router.get("/admin/categories/", (req, res) => {
  Category.findAll({ raw: true }).then((categories) =>
    res.render("admin/categories/", {
      title: "Categorias",
      categories,
    })
  );
});

router.get("/admin/categories/edit/:id", (req, res) => {
  const { id } = req.params;
  isNaN(id) && res.redirect("/admin/categories/");

  Category.findByPk(id)
    .then((category) => {
      if (category) {
        res.render("admin/categories/edit", {
          title: "Editar",
          category,
        });
      } else {
        res.redirect("/admin/categories/");
      }
    })
    .catch((error) => {
      res.redirect("/admin/categories/");
    });
});

router.post("/categories/update", (req, res) => {
  const { id, title } = req.body;

  if (title !== undefined && title !== "") {
    Category.update(
      {
        title,
        slug: slugify(title, {
          lower: true,
        }),
      },
      { where: { id } }
    ).then(() => res.redirect("/admin/categories/"));
  } else {
    res.redirect("/admin/categories/new");
  }
});

module.exports = router;
