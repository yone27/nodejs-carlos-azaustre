"use strict";
const express = require("express");
const userCrtl = require("../controllers/user");
const auth = require("../middlewares/auth");
const ProductCrtl = require("../controllers/product");
const api = express.Router();

api.get("/product", ProductCrtl.getProducts);

api.get("/product/:productId", ProductCrtl.getProduct);

api.post("/product/", ProductCrtl.saveProduct);

api.put("/product/:productId", auth, ProductCrtl.updateProduct);

api.delete("/product/:productId", auth, ProductCrtl.deleteProduct);

api.post("/signup", userCrtl.signUp);
api.post("/signin", userCrtl.signIn);

api.get("/private", auth, (req, res) => {
  res.status(200).send({ message: "tienes acceso" });
});

module.exports = api;
