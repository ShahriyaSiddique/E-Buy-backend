const slugify = require("slugify");
const Category = require("../models/category");

createCategoryList = (categories, parentId = null) => {
  const categoryList = [];
  let category;

  if (parentId == null) {
    category = categories.filter((cat) => {
      return cat.parentId == undefined;
    });
  } else {
    category = categories.filter((cat) => {
      return cat.parentId == parentId;
    });
  }

  for (item of category) {
    categoryList.push({
      _id: item._id,
      name: item.name,
      slug: item.slug,
      children: createCategoryList(categories, item._id),
    });
  }
  return categoryList;
};

exports.addCategory = (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };

  if (req.file) {
    categoryObj.categoryImage = `https://e-buy-mern.herokuapp.com//public/${req.file.filename}`;
  }

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  const cat = new Category(categoryObj);

  cat.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error,
      });
    }
    if (data) {
      return res.status(201).json({
        category: data,
      });
    }
  });
};

exports.getCategories = (req, res) => {
  Category.find({}).exec((err, data) => {
    if (err) {
      res.status(400).json({ err });
    }

    if (data) {
      const categoryList = createCategoryList(data);

      res.status(201).json({ Categories: categoryList });
    }
  });
};
