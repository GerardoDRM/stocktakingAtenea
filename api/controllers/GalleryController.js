/**
 * GalleryController
 *
 * @description :: Server-side logic for managing Galleries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const fs = require('fs');

module.exports = {

  // Get Gallery by product
  getGallery: function(req, res) {
    var product = req.param("idproduct");
    Gallery.find({
      "product_idproduct": product
    }, function getPhotos(err, photos) {
      if (err) {
        res.json({"status": 500});
      }
      // Return gallery list
      res.json({"status": 200, "photos": photos});
    });
  },

  // Upload Image
  uploadImgProduct: function(req, res) {
    req.file('product').upload({
      dirname: require('path').resolve(sails.config.appPath, 'assets/uploads')
    }, function(err, uploadedFiles) {
      if (err || uploadedFiles.length == 0)
        return res.negotiate(err);

      // Create data on Gallery table
      var data = {
        "url": uploadedFiles[0].fd.replace(sails.config.appPath + "/", ""),
        "product_idproduct": req.param("idproduct")
      }
      Gallery.create(data, function createPhoto(err, gallery) {
        if (err || gallery === undefined) {
          return res.json({"status": 500});
        }
        return res.json({"status": 200});
      });
    });
  },

  // Detele Product Image
  deleteImgProduct: function(req, res) {
    // Remove file from database
    Gallery.destroy({
      "idgallery": req.param("idgallery")
    }, function(err) {
      if (err) {
        return res.json({"status": 500});
      }
      // Remove physical file from directory
      fs.unlink(req.param("url"), (err) => {
        if (err)
          return res.json({"status": 500});

        return res.json({"status": 200});
      });
    });
  }

};
