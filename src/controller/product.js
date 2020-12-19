const slugify = require("slugify");
const Product = require("../models/product");

exports.createProduct = (req, res) => {
  const { name, description, price, quantity, category } = req.body;
  let productPicture = [];

  if (req.files.length > 0) {
    productPicture = req.files.map((item) => {
      return { img: item.filename };
    });
  }

  const product = new Product({
    name,
    slug: slugify(name),
    description,
    price,
    quantity,
    createdBy: req.user._id,
    productPicture,
    category,
  });

  product.save((err, data) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }
    if (data) {
      return res.status(200).json({ data });
    }
  });
};
