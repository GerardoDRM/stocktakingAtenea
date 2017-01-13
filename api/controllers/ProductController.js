/**
 * ProductController
 *
 * @description :: Server-side logic for managing Products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  showProducts: function(req, res) {
    Product.find({}, function find(err, products) {
      if (err || products === undefined) return res.negotiate(err);
      // Return productes array
      return res.json({
        "status": 200,
        "products": products
      })
    });
  },

  getProductById: function(req, res) {
    Product.findOne({"idproduct": req.param("id")}, function find(err, product) {
      if (err || product === undefined) return res.negotiate(err);
      // Return productes array
      return res.json({
        "status": 200,
        "product": product
      })
    });
  },


  addProduct: function(req, res) {
    var values = req.allParams();
    Product.create(values, function createProduct(err, product) {
      if (err) {
        // Otherwise, send back something reasonable as our error response.
        return res.negotiate(err);
      }
      // Send back the id of the new product
      return res.json({
        "status": 200,
        "product": product
      });
    });
  },

  searchProduct: function(req, res) {
    Product.findOne({
      idproduct: req.param("id")
    }, function searchProduct(err, product) {
      if (err || product === undefined) return res.negotiate(err);
      return res.json({
        "status": 200,
        "product": product
      });
    });
  },

  deleteProduct: function(req, res) {

    Product.destroy({
      idproduct: req.param("id")
    }, function deleteProduct(err) {
      if (err) {
        // Otherwise, send back something reasonable as our error response.
        return res.negotiate(err);
      }
			return res.json({
        "status": 200
      });
    });
  },

  updateProduct: function(req, res) {
    var values = req.allParams();
    Product.update({
      idproduct: req.param("id")
    }, values).exec(function updateProduct(err, updated) {
      if (err) {
        // handle error here- e.g. `res.serverError(err);`
        return res.negotiate(err);
      }
      return res.json({
        "status": 200,
        "product": updated
      });
    });

  }

  // Specific products CRUD


};
