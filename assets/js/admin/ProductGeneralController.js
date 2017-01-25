app.controller('ProductGeneralController', [
  '$scope',
  '$rootScope',
  '$http',
  '$compile',
  'productObject',

  function($scope, $rootScope, $http, $compile, productObject) {

    $scope.product = {};
    $scope.po = productObject;
    // Get products list
    var getProductById = function(id) {
      $scope.product = {};
      $http({
        method: "GET",
        url: '/api/v0/products/' + id
      }).then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          $scope.product = data.product;
        }
      }, function errorCallback(response) {});
    }

    // Start tab
    var init = function() {
      if ($scope.po.getID() !== undefined) {
        getProductById($scope.po.getID());
      }
    }
    // Listen if this controller needs to start
    $rootScope.$on("ProductMethodInit", function() {
      $scope.product = {};
      init();
    });

    // Create new product
    var createProduct = function() {
      // Change Price to float
      $scope.product.price = parseFloat($scope.product.price);
      $http({
        method: "POST",
        url: '/api/v0/product',
        data: $scope.product
      }).then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          $scope.po.setID(data.product.idproduct);
          getProductById($scope.po.getID())
        }
      }, function errorCallback(response) {});
    }

    // Update Products
    var updateProduct = function() {
      var id = $scope.product["idproduct"];
      $http({
        method: "PUT",
        url: '/api/v0/products/' + id,
        data: $scope.product
      }).then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          getProductById($scope.po.getID());
        }
      }, function errorCallback(response) {});
    }

    $scope.storeData = function(form) {
      if (form) {
        // Select update or create
        if ($scope.po.getID() !== undefined) {
          updateProduct();
        } else {
          createProduct();
        }

      }
    }
  }
]);
