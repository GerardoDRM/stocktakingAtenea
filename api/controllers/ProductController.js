/**
 * ProductController
 *
 * @description :: Server-side logic for managing Products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var nodemailer = require('nodemailer');

var transport = nodemailer.createTransport("SMTP", {
  service: "hotmail",
  auth: {
    user: "",
    pass: ""
  }
});

module.exports = {

  showProducts: function(req, res) {
    Product.query("Select product.idproduct, name, price, model, \
    idbranch, SUM(quantity) as quantity from product, productdetails \
    where product.idproduct = productdetails.idproduct group by 1,2,3,4", [], function find(err, products) {
      if (err || products === undefined)
        return res.json({"status": 500});

      Product.find({}, function getProducts(err, pr) {
        if (err || pr === undefined)
          return res.json({"status": 500});

        // Create a mix of products
        var mix = [];
        for (var p in pr) {
          var flag = true;
          for (var p2 in products) {
            // Check if product has complete data
            if (pr[p]["idproduct"] == products[p2]["idproduct"]) {
              mix.push(products[p2]);
              flag = false;
              break;
            }
          }
          if (flag) {
            // Add ExtraData
            var newP = pr[p];
            newP["idbranch"] = "";
            newP["quantity"] = 0;
            mix.push(newP);
          }
        }

        // Return productes array
        return res.json({"status": 200, "products": mix})
      });
    });
  },

  getProductById: function(req, res) {
    Product.findOne({
      "idproduct": req.param("id")
    }, function find(err, product) {
      if (err || product === undefined)
        return res.negotiate(err);

      // Return productes array
      return res.json({"status": 200, "product": product})
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
      return res.json({"status": 200, "product": product});
    });
  },

  searchProduct: function(req, res) {
    Product.findOne({
      idproduct: req.param("id")
    }, function searchProduct(err, product) {
      if (err || product === undefined)
        return res.negotiate(err);
      return res.json({"status": 200, "product": product});
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
      return res.json({"status": 200});
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
      // Check if update on stock and compare min product
      // if (updated["min_product"] !== undefined || updated["min_product"] != null) {
      //   // Compare quantity
      //   if (updated["min_product"] >= updated["quantity"]) {
      //     var mailOptions = {
      //       from: 'Atenea Warning 👥 <contacto@nextplayers.mx>', // sender address
      //       to: 'gerardo.bw@gmail.com', // list of receivers
      //       subject: "Tema: Reabastecimiento de inventario", // Subject line
      //       html: "Producto:" + updated["id"] + "<br/>" // html body
      //     };
      //
      //     transport.sendMail(mailOptions, function(error, info) {
      //       if (error) {
      //         return console.log(error);
      //       }
      //       console.log('Message sent: ' + info.response);
      //     });
      //   }
      // }
      return res.json({"status": 200, "product": updated});
    });

  }

  // Specific products CRUD

};
