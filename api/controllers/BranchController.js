/**
 * BranchController
 *
 * @description :: Server-side logic for managing Branches
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  showBranches: function(req, res) {
    Branch.find({}, function find(err, branches) {
      if (err || branches === undefined) return res.negotiate(err);
      // Return branches array
      return res.json({
        "status": 200,
        "branches": branches
      })
    });
  },

  createBranch: function(req, res) {
    var data = {
      "name": req.param("name"),
      "street": req.param("street"),
      "city": req.param("city"),
      "state": req.param("state")
    };
    Branch.create(data, function created(err, newBranch) {
      if (err || newBranch === undefined) return res.negotiate(err);
      return res.json({
        "status": 200
      })
    });
  }


};
