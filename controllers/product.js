const Product = require("../models/product");

function getProduct(req, res) {
  let productId = req.params.productId;
  const product = Product.findById(productId, (err, product) => {
    if (err)
      res.status(500).send({ message: `Error al buscar product: ${err}` });
    if (!product) res.status(404).send({ message: `El producto no existe` });
    res.status(200).send({ product });
  });
}
function getProducts(req, res) {
  let products = Product.find({}, (err, products) => {
    if (err)
      res.status(500).send({ message: `Error al buscar product: ${err}` });
    if (!products) res.status(404).send({ message: "no existen productos" });
    res.status(200).send({ products });
  });
}

function saveProduct(req, res) {
  let product = new Product();
  product.name = req.body.name;
  product.picture = req.body.picture;
  product.price = req.body.price;
  product.category = req.body.category;
  product.description = req.body.description;

  product.save((err, productStored) => {
    if (err)
      res.status(500).send({ message: `Error al salvar en la base de datos: ${err}` });
    res.status(200).send({ product: productStored });
  });
}

function updateProduct(req, res) {
  let productId = req.params.productId;

  let update = req.body;

  Product.findByIdAndUpdate(productId, update, (err, productUpdate) => {
    if (err)
      res
        .status(500)
        .send({ message: `Error al actualizar el product: ${err}` });

    res.status(200).send({ product: productUpdate });
  });
}
function deleteProduct(req, res) {
  let productId = req.params.productId;
  Product.findById(productId, (err, product) => {
    if (err)
      res.status(500).send({ message: `Error al borrar el product: ${err}` });
    if (!product) {
      res.status(500).send({ message: `product no existe` });
    }
    product.remove(err => {
      if (err)
        res.status(500).send({ message: `Error al borrar el product: ${err}` });
      res.status(200).send({ message: `El producto ha sido eliminado` });
    });
  });
}

module.exports = {
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  saveProduct
};
