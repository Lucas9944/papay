const express = require("express");
const router_bssr = express.Router();
const restaurantController = require("./controllers/restaurantController");
const productController = require("./controllers/restaurantController");
const uploader_product = require("./utils/upload-multer")("products");

/*******************************
 *          REST EJS           *
 *******************************/

router_bssr
  .get("/signup", restaurantController.getSignupMyRestaurant)
  .post("/signup", restaurantController.signupProcess);

router_bssr
  .get("/login", restaurantController.getLoginMyRestaurant)
  .post("/login", restaurantController.loginProcess);
router_bssr.get("/logout", restaurantController.logout);
router_bssr.get("/check-me", restaurantController.checkSessions);

router_bssr
  .get("products/menu", restaurantController.getMyRestaurantData)
  .post(
    "/products/create",
    restaurantController.validateAuthRestaurant,
    uploadProductImage.array("product-image", 5),
    productController.addNewProduct
  );

router_bssr.post("products/edit/:id", productController.updateChosenProduct);

module.exports = router_bssr;
