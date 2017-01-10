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
    var values = req.allParams();
    Branch.create(values, function created(err, newBranch) {
      if (err || newBranch === undefined) return res.negotiate(err);
      return res.json({
        "status": 200
      })
    });
  },

  deleteBranch: function(req, res) {
    Branch.desrtoy({
      "idbranch": req.param("id")
    }, function remove(err) {
      if (err || newBranch === undefined) return res.negotiate(err);
      return res.json({
        "status": 200
      })
    });
  },

  updateBranch: function(req, res) {
    var values = req.allParams();

    Branch.update({
      "idbranch": req.param("id")
    }, values).exec(function updateBranch(err, branch) {
      if (err || newBranch === undefined) return res.negotiate(err);
      return res.json({
        "status": 200,
        "branch": branch
      });
    });
  },


};
