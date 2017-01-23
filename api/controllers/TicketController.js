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
    total_price, color from sales, ticket, productdetails, product \
    where sales.ticket = ticket.idticket and sales.iddetail = productdetails.iddetail \
    and product.idproduct = productdetails.idproduct and ticket.idticket = ' + idTicket, [], function(err, rawResult) {
      if (err) {
        return res.json({"status": 500});
      }
      return res.json({"status": 200, "data": rawResult});
    });
  },

  // Get returns admin
  getReturnsDetails: function(req, res) {
    var idTicket = req.param('idTicket');

    Sales.query('select date, color, product.name, product.idproduct, branch.name \
    from ticket, productdetails, product, sales, branch where \
    ticket.idticket = sales.ticket and sales.iddetail = productdetails.iddetail \
    and productdetails.idproduct = product.idproduct and \
    branch.idbranch = productdetails.idbranch \
    and ticket.model = "return" and ticket.idticket = ' + idTicket, [], function(err, rawResult) {
      if (err) {
        return res.json({"status": 500});
      }
      return res.json({"status": 200, "data": rawResult});
    });
  },

  addTicket: function(req, res) {
    var values = req.allParams();
    Ticket.create(values, function createTicket(err, ticket) {
      if (err) {
        // Otherwise, send back something reasonable as our error response.
        return res.negotiate(err);
      }
      // Send back the id of the new ticket
      return res.json({"status": 200, "ticket": ticket});
    });
  },

  searchTicket: function(req, res) {
    Ticket.findOne({
      idticket: req.param("id")
    }, function searchTicket(err, ticket) {
      if (err || ticket === undefined)
        return res.negotiate(err);
      return res.json({"status": 200, "ticket": ticket});
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
      return res.json({"status": 200});
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
      return res.json({"status": 200, "ticket": updated});
    });

  }

};
