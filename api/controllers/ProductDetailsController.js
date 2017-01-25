/**
 * ProductDetailsController
 *
 * @description :: Server-side logic for managing Productdetails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  // Get all products details employees
  getProductsDetailsEmployees: function(req, res) {
    Productdetails.query('select * from product, productdetails \
    where product.idproduct = productdetails.idproduct', [], function(err, rawResult) {
      if (err) {
        return res.json({"status": 500});
      }
      return res.json({"status": 200, "data": rawResult});
    });
  },

  // POST create Products details
  createProductDetails: function(req, res) {
    var values = req.allParams();
    // Create product details
    Productdetails.create(values, function createDetails(err, details) {
      if (err) {
        // Otherwise, send back something reasonable as our error response.
        return res.json({"status": 500});
      }
      return res.json({"status": 200, "product": details});
    });
  },

  // GET Product details list
  showProductDetails: function(req, res) {
    var values = req.allParams();
    Productdetails.find(values, function find(err, products) {
      if (err || products === undefined)
        return res.json({"status": 500});

      // Return productes array
      return res.json({"status": 200, "products": products})
    });
  },

  deleteProductDetails: function(req, res) {
    Productdetails.destroy({
      iddetail: req.param("iddetail")
    }, function deleteProduct(err) {
      if (err) {
        // Otherwise, send back something reasonable as our error response.
        return res.json({"status": 500});
      }
      return res.json({"status": 200});
    });
  },

  updateProductDetails: function(req, res) {
    var values = req.allParams();
    var iddetail = req.param("iddetail");
    delete values["iddetail"];
    Productdetails.update({
      iddetail: iddetail
    }, values).exec(function updateProduct(err, updated) {
      if (err) {
        return res.json({"status": 500});
      }
      return res.json({"status": 200, "product": updated});
    });

  }

};
