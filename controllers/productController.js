const productModel = require("../models/productModel");
const cloudinary = require("../utils/cloudinary");

const ProductController = {};

ProductController.createProduct = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      message: "No files were uploaded.",
      success: false,
    });
  }

  const newProduct = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
  };

  // Vérification de l'existence du produit par titre
  productModel.checkProductExistsByTitle(
    newProduct.title,
    async (err, exists) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (exists) {
        res
          .status(409)
          .json({ message: "Le produit avec ce titre existe déjà" });
        return;
      }

      // Processus de téléchargement des images sur Cloudinary
      const images = [];
      for (let file of req.files) {
        const fileBuffer = file.buffer.toString("base64");
        const mimeType = file.mimetype;

        try {
          const result = await cloudinary.uploader.upload(
            `data:${mimeType};base64,${fileBuffer}`,
            {
              folder: "crud", // Spécifiez le dossier dans Cloudinary si nécessaire
            }
          );
          images.push(result.secure_url);
        } catch (uploadError) {
          res.status(500).json({ error: uploadError.message });
          return;
        }
      }

      newProduct.images = images;

      // Si le produit n'existe pas, créez-le
      productModel.createProduct(newProduct, (err, product) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }

        res.status(201).json({ message: "Produit créé avec succès", product });
      });
    }
  );
};

ProductController.getAllProducts = async (req, res) => {
  productModel.getAllProducts((err, products) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json({ products });
  });
};

ProductController.getProductById = async (req, res) => {
  const productId = parseInt(req.params.productId);

  productModel.getProductById(productId, (err, product) => {
    if (err) {
      if (err.message === "Produit introuvable") {
        res.status(404).json({ message: err.message });
        return;
      }
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json({ product });
  });
};

ProductController.updateProduct = async (req, res) => {
  const productId = parseInt(req.params.productId);
  const updatedProduct = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
  };

  productModel.updateProduct(productId, updatedProduct, (err, result) => {
    if (err) {
      if (err.message === "Produit introuvable") {
        res.status(404).json({ message: err.message });
        return;
      }
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json({ message: "Produit mis à jour" });
  });
};

ProductController.deleteProduct = async (req, res) => {
  const productId = parseInt(req.params.productId);

  productModel.deleteProduct(productId, (err, result) => {
    if (err) {
      if (err.message === "Produit introuvable") {
        res.status(404).json({ message: err.message });
        return;
      }
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json({ message: "Produit supprimé" });
  });
};

module.exports = ProductController;
