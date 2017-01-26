app.controller('ProductDetailsController', [
  '$scope',
  '$rootScope',
  '$http',
  '$compile',
  'productObject',
  function($scope, $rootScope, $http, $compile, productObject) {

    $scope.branches = [];
    var po = productObject;
    $scope.details = {};
    $scope.rowsNumber = 0;
    $scope.po = productObject;

    // Create empty array
    $scope.getNumber = function(num) {
      return new Array(num);
    }

    // Get branches list
    var getAllBranches = function() {
      $http({method: "GET", url: '/api/v0/branches'}).then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          var branches = data.branches;
          $scope.branches = branches
        }
      }, function errorCallback(response) {});
    }

    // GET Stored detaiils
    var getStoredDetails = function() {
      $http({
        method: "GET",
        url: '/api/v0/products_details',
        params: {
          "idproduct": $scope.po.getID()
        }
      }).then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          var products = data.products;
          // Iterate Over products and fill table
          $scope.details = {};
          $scope.rowsNumber = 0;
          for (var p in products) {
            $scope.details[p] = products[p];
            // Check branch
            for (var b in $scope.branches) {
              if ($scope.branches[b].idbranch == products[p]['idbranch']) {
                $scope.details[p].idbranch = $scope.branches[b];
              }
            }

            $scope.rowsNumber++;
          }
        }
      }, function errorCallback(response) {});
    }

    // Get Products
    // Listen if this controller needs to start
    $rootScope.$on("ProductMethodInit", function() {
      $scope.details = {};
      $scope.rowsNumber = 0;
      getAllBranches();
      if ($scope.po.getID() !== undefined)
        getStoredDetails();

      }
    );

    // Create new product
    var createDetail = function(product) {
      // Change Price to float
      $http({method: "POST", url: '/api/v0/product_details', data: product}).then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          getStoredDetails();
        }
      }, function errorCallback(response) {});
    }

    var updateProductDetails = function(product) {
      // Update details
      $http({method: "PUT", url: '/api/v0/products_details', data: product}).then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          getStoredDetails();
        }
      }, function errorCallback(response) {});
    }

    // Store details product
    $scope.storeDetail = function(index) {
      // Validate Product Detail
      var product = $scope.details[index];
      var required = ['color', 'size', 'idbranch', 'quantity'];
      var count = 0;
      for (var r in required) {
        // Check color default
        if (product[required[r]] === undefined) {
          if (required[r] == 'color') {
            product['color'] = "#000000";
          } else {
            count++;
          }
        } else {
          if (required[r] == 'idbranch') {
            product['idbranch'] = product["idbranch"].idbranch;
          }
        }
      }
      // Check if update or create
      if (count == 0 && $scope.po.getID() !== undefined) {
        product["idproduct"] = $scope.po.getID();
        if (product["iddetail"] === undefined) {
          createDetail(product);
        } else {
          updateProductDetails(product);
        }
      }
    }

    // Add Details table row empty
    $scope.generateTemplate = function() {
      $scope.rowsNumber++;
    }

    var deleteDetailProduct = function(id) {
      // Update details
      $http({
        method: "DELETE",
        url: '/api/v0/products_details/' + id
      }).then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          getStoredDetails();
        }
      }, function errorCallback(response) {});
    }

    $scope.removeDetail = function(index) {
      $scope.rowsNumber--;
      var product = $scope.details[index];
      // Check if it's stored or it's just a template
      if (product["iddetail"] === undefined) {
        getStoredDetails();
      } else {
        deleteDetailProduct(product["iddetail"]);
      }

    }
  }
]);
