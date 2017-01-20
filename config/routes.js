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
  '/dashboard': "EmployeeController.showDashboard",
  '/login': {
    view: 'dashboard/login'
  },
  '/product/:id': {
    view: 'dashboard/product_layout'
  },
  '/product': {
    view: 'dashboard/product_layout'
  },
  /***************************************************************************
   *                                                                          *
                              API RESTFUL
   *                                                                          *
   ***************************************************************************/
  // Branch CRUD API
  'GET /api/v0/branches': "BranchController.showBranches",
  'POST /api/v0/branch': "BranchController.createBranch",
  'DELETE /api/v0/branches/:id': 'BranchController.deleteBranch',
  'PUT /api/v0/branches/:id': 'BranchController.updateBranch',
  'GET /api/v0/branches/:id': 'BranchController.getBranchById',

  // Employee CRUD API
  'GET /api/v0/employees': 'EmployeeController.showEmployees',
  'POST /api/v0/signup': 'EmployeeController.signup',
  'PUT /api/v0/login': 'EmployeeController.login',
  'GET /logout': 'EmployeeController.logout',
  'DELETE /api/v0/employees/:id': 'EmployeeController.deleteEmployee',
  'PUT /api/v0/employees/:id': 'EmployeeController.updateEmployee',
  'GET /api/v0/employees/:id': 'EmployeeController.getEmployeeById',

  // PRODUCT CRUD API
  'GET /api/v0/products': 'ProductController.showProducts',
  'POST /api/v0/product': 'ProductController.addProduct',
  'DELETE /api/v0/products/:id': 'ProductController.deleteProduct',
  'PUT /api/v0/products/:id': 'ProductController.updateProduct',
  'GET /api/v0/products/:id': 'ProductController.getProductById',

  // PRODUCT CRUD API DETAILS
  'GET /api/v0/products_details': 'ProductController.showProductDetails',
  'POST /api/v0/product_details': 'ProductController.createProductDetails',
  'DELETE /api/v0/products_details/:id': 'ProductController.deleteProductDetails',
  'PUT /api/v0/products_details': 'ProductController.updateProductDetails',

  // UPLOAD IMAGE
  'PUT /api/v0/product/image/:id': 'GalleryController.uploadImgProduct'
  'DELETE /api/v0/product/image/:id': 'GalleryController.uploadImgProduct'


};
