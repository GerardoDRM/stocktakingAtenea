app.controller('ProductDetailsController', [
  '$scope',
  '$http',
  '$compile',
  'productObject',

  function($scope, $http, $compile, productObject) {

    $scope.detail = {};
    $scope.branches = [];
    // var po = productObject;
    var po = {
      "id": "CA213"
    };
    $scope.details = {};
    $scope.rowsNumber = 0;

    // Create empty array
    $scope.getNumber = function(num) {
      return new Array(num);
    }


    // Get branches list
    var getAllBranches = function() {
      $http({
        method: "GET",
        url: '/api/v0/branches'
      }).then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          var branches = data.branches;
          $scope.branches = branches;
        }
      }, function errorCallback(response) {});
    }

    getAllBranches();

    // Create new product
    var createDetail = function(product) {
      // Change Price to float
      $http({
        method: "POST",
        url: '/api/v0/product_details',
        data: product
      }).then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          // $scope.getProducts();
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
      if (count == 0 && po["id"] !== undefined) {
        product["idproduct"] = po["id"];
        createDetail(product);
      }

    }

    // Add Details table row empty
    $scope.generateTemplate = function() {
      $scope.rowsNumber++;
    }

    $scope.removeTemplate = function() {

    }
  }
]);
