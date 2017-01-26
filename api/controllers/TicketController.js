/**
 * TicketController
 *
 * @description :: Server-side logic for managing Tickets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  // Get ticket details
  getTicketDetails: function(req, res) {
    var idTicket = req.param('idTicket');

    Sales.query('select product.idproduct,product.name, unitary_price, \
    total_price, color, size from sales, ticket, productdetails, product \
    where sales.ticket = ticket.idticket and sales.iddetail = productdetails.iddetail \
    and product.idproduct = productdetails.idproduct and ticket.idticket = ' + idTicket, [], function(err, rawResult) {
      if (err) {
        return res.json({
          "status": 500
        });
      }
      return res.json({
        "status": 200,
        "data": rawResult
      });
    });
  },

  // Get returns admin
  getReturnsDetails: function(req, res) {

    Sales.query('select return_date, color, size, product.name, product.idproduct, branch.name \
    from ticket, productdetails, product, sales, branch where \
    ticket.idticket = sales.ticket and sales.iddetail = productdetails.iddetail \
    and productdetails.idproduct = product.idproduct and \
    branch.idbranch = productdetails.idbranch \
    and sales.model = "return"', [], function(err, rawResult) {
      if (err) {
        return res.json({
          "status": 500
        });
      }
      return res.json({
        "status": 200,
        "data": rawResult
      });
    });
  },

  //Get returns employees

  getReturnsDetailsEmployee: function(req, res) {

    Sales.query('select size, sales.iddetail, sales.ticket, ticket.date, color, product.name, product.idproduct, branch.name \
    from ticket, productdetails, product, sales, branch where \
    ticket.idticket = sales.ticket and sales.iddetail = productdetails.iddetail \
    and productdetails.idproduct = product.idproduct and \
    branch.idbranch = productdetails.idbranch \
    and sales.model != "return"', [], function(err, rawResult) {
      if (err) {
        return res.json({
          "status": 500
        });
      }
      return res.json({
        "status": 200,
        "data": rawResult
      });
    });
  },

  // Update return
  updateReturnProduct: function(req, res) {
    var data = {
      "iddetail": req.param("iddetail"),
      "ticket": req.param("idticket")
    };
    Sales.findOne(data, function getProductSale(err, sale) {
      if (err || sale === undefined) {
        res.json({
          "status": 500
        });
      }
      sale["return_date"] = req.param("date");
      sale["model"] = "return";
      sale.save();
      // Update Products details
      // Find all products
      Productdetails.findOne({
        "iddetail": sale["iddetail"]
      }).exec(function(err, detail) {
        if (err) {
          return res.json({
            "status": 500
          });
        }
        // update all product quantity
        detail["quantity"] += parseInt(req.param("returnNum"));
        detail.save();
        return res.json({
          "status": 200,
          "sales": sale
        });
      }); // End product details
    });
  },

  addTicket: function(req, res) {
    var values = req.allParams();
    Ticket.create(values["ticket"], function createTicket(err, ticket) {
      if (err) {
        // Otherwise, send back something reasonable as our error response.
        return res.negotiate(err);
      }
      // Send back the id of the new ticket
      var ticketID = ticket.idticket;
      // Create Sales
      // Configure sales objects
      var sales = values["sales"];
      var newSales = [];
      for (var s in sales) {
        newSales.push({
          "quantity": sales[s]["quantity_cart"],
          "unitary_price": sales[s]["price"],
          "total_price": sales[s]["total_price"],
          "model": "sale",
          "iddetail": sales[s]["iddetail"],
          "ticket": ticketID
        });
      }

      Sales.create(newSales, function createSales(err, sales) {
        if (err) {
          return res.json({
            "status": 500
          });
        }
        // Update each product
        var pDetailsIDs = [];
        for (var s in sales) {
          pDetailsIDs.push(sales[s]["iddetail"]);
        }
        // Find all products
        Productdetails.find().where({
            iddetail: pDetailsIDs
          })
          .exec(function(err, details) {
            if (err) {
              return res.json({
                "status": 500
              });
            }
            // update all products quantity
            for (var s in sales) {
              for (var d in details) {
                if (sales[s]["iddetail"] == details[d]["iddetail"]) {
                  details[d]["quantity"] = details[d]["quantity"] - sales[s]["quantity"];
                  details[d].save();
                }
              }
            }
            return res.json({
              "status": 200,
              "ticket": ticket,
              "sales": sales
            });
          }); // End product details
      });
    });
  },

  searchTicket: function(req, res) {
    Ticket.findOne({
      idticket: req.param("id")
    }, function searchTicket(err, ticket) {
      if (err || ticket === undefined)
        return res.negotiate(err);
      return res.json({
        "status": 200,
        "ticket": ticket
      });
    });
  },

  deleteTicket: function(req, res) {

    Ticket.destroy({
      idticket: req.param("id")
    }, function deleteTicket(err) {
      if (err) {
        // Otherwise, send back something reasonable as our error response.
        return res.negotiate(err);
      }
      return res.json({
        "status": 200
      });
    });
  },

  updateTicket: function(req, res) {
    var values = req.allParams();
    Ticket.update({
      idticket: req.param("id")
    }, values).exec(function updateTicket(err, updated) {
      if (err) {
        // handle error here- e.g. `res.serverError(err);`
        return res.negotiate(err);
      }
      return res.json({
        "status": 200,
        "ticket": updated
      });
    });

  }

};
