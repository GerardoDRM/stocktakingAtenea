/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
   * etc. depending on your default view engine) your home page.              *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  '/': {
    view: 'website/home'
  },
  '/dashboard': {
    view: 'dashboard/dashboard_main'
  },
  '/employee': {
    view: 'dashboard/dashboard_employee'
  },



  /***************************************************************************
   *                                                                          *
                              API RESTFUL
   *                                                                          *
   ***************************************************************************/
  // Branch CRUD API
  'GET /api/v0/branches': "BranchController.showBranches",
  'POST /api/v0/branch': "BranchController.createBranch",
  'PUT  '
  'DELETE'
  // Employee CRUD API
  'POST /api/v0/signup': 'EmployeeController.signup',
  'PUT /api/v0/login': 'EmployeeController.login',
  'GET /logout': 'EmployeeController.logout'

  // PRODUCT CRUD API




};
