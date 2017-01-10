/**
 * ProductController
 *
 * @description :: Server-side logic for managing Products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	addProduct: function(req, res){

		var data = {
			id: req.param("id"),
			name: req.param('name'),
			price: req.param('price'),
			category: req.param('category'),
			quantity: req.param('quantity'),
			location: req.param("location")
			tickets: req.param("tickets")

		}

		Product.create(data, function createProduct(err, product){
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

	searchProduct: function(req, res){

		Product.findOne({id: req.param("id")}, function searchProduct(err, product){

	      if (err || product === undefined) return res.negotiate(err);
	      if (!product) return res.notFound();
		});
	},

	deleteProduct: function(req, res){

		Product.destroy({id: req.param("id")}, function deleteProduct(err){

			if (err) {
				// Otherwise, send back something reasonable as our error response.
				return res.negotiate(err);
			}




		});

	},

	updateProduct: function(req, res){

		var data = {
			id: req.param("id"),
			name: req.param('name'),
			price: req.param('price'),
			category: req.param('category'),
			quantity: req.param('quantity'),
			location: req.param("location")
			tickets: req.param("tickets")

		}

		Product.update({id: req.param("id")}, data).exec(function updateProduct(err, updated){
			if (err) {
	// handle error here- e.g. `res.serverError(err);`
	return res.negotiate(err);
}

return res.json({
  "status": 200,
  "Product": updated
});
		});

	}

};
