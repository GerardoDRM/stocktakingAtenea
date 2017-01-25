app.controller('ProductGalleryController', [
  '$scope',
  '$rootScope',
  '$http',
  '$compile',
  'productObject',

  function($scope, $rootScope, $http, $compile, productObject) {
    var photosArray = [];
    // var po = productObject;
    $scope.po = productObject;

    var previewPhotos = function(index, photo) {
      var parent = $("#photo" + index);
      $(parent[0]).css({
        'display': 'none'
      });
      var previewImage = $(parent[0]).next();
      var url = photo.url.replace('assets/', "./")
      $(previewImage[0]).css({
        "background": "url(" + url + ") center / cover",
        'display': 'block'
      });
    }

    // Reset all gallery
    var cleanPreviews = function() {
      for (var i = 0; i < 4; i++) {
        var parent = $("#photo" + i);
        $(parent[0]).css({
          'display': 'block'
        });
        var previewImage = $(parent[0]).next();
        $(previewImage[0]).css({
          'display': 'none'
        });
      }
    }

    $scope.getFiles = function() {
      cleanPreviews();
      $http({
        method: "GET",
        url: '/api/v0/get_gallery/' + $scope.po.getID()
      }).then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          var photos = data.photos;
          // Add Preview On Images
          photosArray = [];
          for (var p in photos) {
            photosArray.push(photos[p]);
            previewPhotos(p, photos[p]);
          }
        }
      }, function errorCallback(response) {});
    }

    // Call photos
    // Listen if this controller needs to start
    $rootScope.$on("ProductMethodInit", function() {
      photosArray = [];
      $scope.getFiles();
    });

    // Delete photos
    $scope.deletePhoto = function(id) {
      var gallery = photosArray[id]
      $http({
        method: "DELETE",
        url: '/api/v0/product/image/' + gallery["idgallery"],
        data: {
          "url": gallery["url"]
        }
      }).then(function successCallback(response) {
        var data = response.status;
        if (data == 200) {
          $scope.getFiles();
        }
      }, function errorCallback(response) {});
    }
  }
]);
