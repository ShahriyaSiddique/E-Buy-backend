const { Router } = require("express");
const router = Router();

const { addItemToCart } = require("../controller/cart");
const { requireSignin, userMiddleware } = require("../common-middleware");

router.post(
  "/user/cart/addtocart",
  requireSignin,
  userMiddleware,
  addItemToCart
);

module.exports = router;
