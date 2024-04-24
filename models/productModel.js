const db = require("../config/connexion");

const Product = {};

Product.createProduct = (product, result) => {
  const query =
    "INSERT INTO products (title, description, price, images) VALUES (?, ?, ?, ?)";
  db.query(
    query,
    [product.title, product.description, product.price, product.images],
    (err, res) => {
      if (err) {
        console.error("Erreur lors de la création du produit:", err);
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...product });
    }
  );
};

Product.checkProductExistsByTitle = (title, result) => {
  const query = "SELECT * FROM products WHERE title = ?";
  db.query(query, [title], (err, res) => {
    if (err) {
      console.error(
        "Erreur lors de la vérification de l'existence du produit:",
        err
      );
      result(err, null);
      return;
    }
    result(null, res.length > 0);
  });
};

Product.getAllProducts = (result) => {
  db.query("SELECT * FROM products", (err, res) => {
    if (err) {
      console.error("Erreur lors de la récupération des produits:", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Product.getProductById = (productId, result) => {
  db.query("SELECT * FROM products WHERE id = ?", productId, (err, res) => {
    if (err) {
      console.error("Erreur lors de la récupération du produit:", err);
      result(err, null);
      return;
    }
    if (res.length === 0) {
      result(null, { message: "Produit introuvable" });
      return;
    }
    result(null, res[0]);
  });
};

Product.updateProduct = (productId, product, result) => {
  db.query(
    "UPDATE products SET ? WHERE id = ?",
    [product, productId],
    (err, res) => {
      if (err) {
        console.error("Erreur lors de la mise à jour du produit:", err);
        result(err, null);
        return;
      }
      if (res.affectedRows === 0) {
        result(null, { message: "Produit introuvable" });
        return;
      }
      result(null, { message: "Produit mis à jour" });
    }
  );
};

Product.deleteProduct = (productId, result) => {
  db.query("DELETE FROM products WHERE id = ?", productId, (err, res) => {
    if (err) {
      console.error("Erreur lors de la suppression du produit:", err);
      result(err, null);
      return;
    }
    if (res.affectedRows === 0) {
      result(null, { message: "Produit introuvable" });
      return;
    }
    result(null, { message: "Produit supprimé" });
  });
};

module.exports = Product;
