/**
 * EmployeeController
 *
 * @description :: Server-side logic for managing Employees
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Passwords = require('machinepack-passwords');
var crypto = require('crypto');

module.exports = {

  // Change dashboard view depends on user role
  showDashboard: function(req, res) {
    if (!req.session.me) {
      return res.view('dashboard/login');
    }
    Employee.findOne({
      "idemployee": req.session.me
    }, function find(err, employee) {
      if (err || employee === undefined)
        return res.view("dashboard/login");

      // Return branches array
      if (employee.role == "admin") {
        res.view("dashboard/dashboard_main");
      } else {
        res.view("dashboard/dashboard_employee");
      }
    });

  },

  showEmployees: function(req, res) {
    Employee.find({}, function find(err, employees) {
      if (err || employees === undefined)
        return res.negotiate(err);

      // Return branches array
      return res.json({"status": 200, "employees": employees})
    });
  },

  getEmployeeById: function(req, res) {
    Employee.findOne({
      "idemployee": req.param("id")
    }, function find(err, employee) {
      if (err || employee === undefined)
        return res.negotiate(err);

      // Return branches array
      return res.json({"status": 200, "employee": employee})
    });
  },

  /**
   * Check the provided email address and password, and if they
   * match a real user in the database, sign in to Activity Overlord.
   */
  login: function(req, res) {
    // Try to look up user using the provided email address
    Employee.findOne({
      "idemployee": req.param('id')
    }, function foundUser(err, user) {
      if (err || user === undefined)
        return res.negotiate(err);
      if (!user)
        return res.notFound();

      // Compare password attempt from the form params to the encrypted password
      // from the database (`user.password`)
      Passwords.checkPassword({passwordAttempt: req.param('password'), encryptedPassword: user.password}).exec({

        error: function(err) {
          return res.negotiate(err);
        },

        // If the password from the form params doesn't checkout w/ the encrypted
        // password from the database...
        incorrect: function() {
          return res.notFound();
        },

        success: function() {
          // Store user id in the user session
          req.session.me = user.idemployee;
          // All done- let the client know that everything worked.
          return res.json({"status": 200});
        }
      });
    });
  },

  signup: function(req, res) {
    // Encrypt a string using the BCrypt algorithm.
    Passwords.encryptPassword({password: req.param('password'), difficulty: 10}).exec({
      // An unexpected error occurred.
      error: function(err) {},
      // OK.
      success: function(encryptedPassword) {
        var data = {
          idemployee: req.param("idemployee"),
          full_name: req.param('full_name'),
          email: req.param('email'),
          password: encryptedPassword,
          role: req.param('role'),
          workingAt: req.param('workingAt')
        }

        Employee.create(data, function userCreated(err, newUser) {
          if (err) {
            // Otherwise, send back something reasonable as our error response.
            return res.negotiate(err);
          }
          // Send back the id of the new user
          return res.json({"status": 200, "user": newUser});
        });
      }
    });
  }, // end signup
  /**
   * Log out of Activity Overlord.
   * (wipes `me` from the sesion)
   */
  logout: function(req, res) {

    // Look up the user record from the database which is
    // referenced by the id in the user session (req.session.me)
    Employee.findOne(req.session.me, function foundUser(err, user) {
      if (err)
        return res.view("dashboard/login");

      // If session refers to a user who no longer exists, still allow logout.
      if (!user) {
        return res.view("dashboard/login");
      }

      // Wipe out the session (log out)
      req.session.me = null;

      // Either send a 200 OK or redirect to the home page
      return res.view("dashboard/login");

    });
  },

  deleteEmployee: function(req, res) {
    Employee.destroy({
      idemployee: req.param('id')
    }, function userDelete(err) {
      if (err) {
        // Otherwise, send back something reasonable as our error response.
        return res.negotiate(err);
      }
      // Send back the id of the new user
      return res.json({"status": 200});
    });
  },

  updateEmployee: function(req, res) {
    var values = req.allParams();
    delete values["idemployee"];

    Passwords.encryptPassword({password: values['password'], difficulty: 10}).exec({
      // An unexpected error occurred.
      error: function(err) {},
      // OK.
      success: function(encryptedPassword) {
        values["password"] = encryptedPassword;
        Employee.update({
          idemployee: req.param('id')
        }, values).exec(function userUpdated(err, updated) {
          if (err) {
            return res.json({"status": 500});
          }
          return res.json({"status": 200, "user": updated});

        });

      }
    });
  }

};
