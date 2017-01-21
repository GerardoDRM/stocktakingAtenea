app.controller('ProductGeneralController', [
  '$scope',
  '$http',
  '$compile',
  'productObject',

  function($scope, $http, $compile, productObject) {

    $scope.product = {};
    $scope.branches = [];
    $scope.sBranches = [];
    $scope.selectedBranches = {};
    var po = productObject;

    $scope.branchSelected = {
      selected: {}
    };

    // Get branches list
    var getAllBranches = function() {
      $http({
          method: "GET",
          url: '/api/v0/branches'
        })
        .then(function successCallback(response) {
          var data = response.data;
          if (data.status == 200) {
            var branches = data.branches;
            $scope.branches = branches;
          }
        }, function errorCallback(response) {});
    }

    getAllBranches();

    // Get products list
    $scope.getProductById = function(id) {
      $scope.product = {};
      $http({
        method: "GET",
        url: '/api/v0/products/' + id
      }).then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          $scope.product = data.product;
          // Check branch
          for (var b in $scope.branches) {
            if ($scope.branches[b].idbranch == $scope.product.location) {
              $scope.branch = $scope.branches[b];
            }
          }
        }
      }, function errorCallback(response) {});
    }

    // Create new product
    var createProduct = function() {
      // Change Price to float
      $scope.product.price = parseFloat($scope.product.price);
      // Get selected branches ids
      var sBranches = $scope.branchSelected.selected;
      var branchesIds = [];
      for (var b in sBranches) {
        if (sBranches[b]) {
          $scope.product.location = $scope.branches[b].idbranch;
          // Create each product on branches
          $http({
            method: "POST",
            url: '/api/v0/product',
            data: $scope.product
          }).then(function successCallback(response) {
            var data = response.data;
            if (data.status == 200) {
              po["id"] = data.product.idproduct;
            }
          }, function errorCallback(response) {});
        }
      }
    }

    $scope.storeData = function(form) {
      if (form) {
        // Select update or create
        createProduct();
      }
    }

    // Update Products
    var updateProduct = function() {
      var id = $scope.product["idproduct"];
      $scope.product.location = $scope.branch.idbranch;
      $http({
        method: "PUT",
        url: '/api/v0/products/' + id,
        data: $scope.product
      }).then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          console.log("Updated");
          $scope.getAllProducts();
        }
      }, function errorCallback(response) {});
    }

  }
]);
