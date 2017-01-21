/**
 * ProductDetailsController
 *
 * @description :: Server-side logic for managing Productdetails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  // POST create Products details
  createProductDetails: function(req, res) {
    var values = req.allParams();
    // Create product details
    Productdetails.create(values, function createDetails(err, details) {
      if (err) {
        // Otherwise, send back something reasonable as our error response.
        return res.negotiate(err);
      }
      return res.json({"status": 200, "product": details});
    });
  },

  // GET Product details list
  showProductDetails: function(req, res) {
    var values = req.allParams();
    Productdetails.find(values, function find(err, products) {
      if (err || products === undefined)
        return res.negotiate(err);

      // Return productes array
      return res.json({"status": 200, "products": products})
    });
  },

  deleteProductDetails: function(req, res) {
    Product.destroy({
      iddetail: req.param("id")
    }, function deleteProduct(err) {
      if (err) {
        // Otherwise, send back something reasonable as our error response.
        return res.negotiate(err);
      }
      return res.json({"status": 200});
    });
  },

  updateProductDetails: function(req, res) {
    var values = req.allParams();
    Product.update({
      iddetail: req.param("id")
    }, values).exec(function updateProduct(err, updated) {
      if (err) {
        return res.negotiate(err);
      }
      return res.json({"status": 200, "product": updated});
    });

  }

};
