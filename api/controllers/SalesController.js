/**
 * SalesController
 *
 * @description :: Server-side logic for managing Sales
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  addSale: function(req, res) {
    var values = req.allParams();
    Sale.create(values, function createSale(err, sale) {
      if (err) {
        // Otherwise, send back something reasonable as our error response.
        return res.negotiate(err);
      }
      // Send back the id of the new sale
      return res.json({
        "status": 200,
        "sale": sale
      });
    });
  },

  searchSale: function(req, res) {
    Sale.findOne({
      product: req.param("idproduct"),
      ticket: req.param("idticket")
    }, function searchSale(err, sale) {
      if (err || sale === undefined) return res.negotiate(err);
      return res.json({
        "status": 200,
        "sale": sale
      });
    });
  },

  deleteSale: function(req, res) {

    Sale.destroy({
      product: req.param("idproduct"),
      ticket: req.param("idticket")
    }, function deleteSale(err) {
      if (err) {
        // Otherwise, send back something reasonable as our error response.
        return res.negotiate(err);
      }
      return res.json({
        "status": 200
      });
    });
  },

  updateSale: function(req, res) {
    var values = req.allParams();
    Sale.update({
      product: req.param("idproduct"),
      ticket: req.param("idticket")
    }, values).exec(function updateSale(err, updated) {
      if (err) {
        // handle error here- e.g. `res.serverError(err);`
        return res.negotiate(err);
      }
      return res.json({
        "status": 200,
        "sale": updated
      });
    });
  }
};
