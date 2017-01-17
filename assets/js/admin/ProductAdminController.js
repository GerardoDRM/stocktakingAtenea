app.controller('ProductAdminController', ['$scope', '$http', '$compile', function($scope, $http, $compile) {

  $scope.branches = [];
  $scope.branch = undefined;
  $scope.products = [];
  $scope.product = {};
  var dialogState = undefined;


  // Get branches list
  $scope.getAllBranches = function() {
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

  $scope.getAllBranches();

  // Get products list
  $scope.getAllProducts = function() {
    $http({
        method: "GET",
        url: '/api/v0/products'
      })
      .then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          $scope.products = data.products;
        }
      }, function errorCallback(response) {});
  }

  $scope.getAllProducts();

  // Create new product
  var createProduct = function() {
    // Get Branch id
    $scope.product.location = $scope.branch.idbranch;
    $http({
        method: "POST",
        url: '/api/v0/signup',
        data: $scope.product
      })
      .then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          dialog.close();
          $scope.getAllProducts();
        }
      }, function errorCallback(response) {});
  }

  // Get products list
  $scope.getProductById = function(id) {
    $scope.product = {};
    $http({
        method: "GET",
        url: '/api/v0/products/' + id
      })
      .then(function successCallback(response) {
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

  // Update Products
  var updateProduct = function() {
    var id = $scope.product["idproduct"];
    $scope.product.location = $scope.branch.idbranch;
    $http({
        method: "PUT",
        url: '/api/v0/products/' + id,
        data: $scope.product
      })
      .then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          console.log("Updated");
          $scope.getAllProducts();
        }
      }, function errorCallback(response) {});
  }

  // Delete Products
  $scope.deleteProduct = function(id) {
    $http({
        method: "DELETE",
        url: '/api/v0/products/' + id
      })
      .then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          $scope.getAllProducts();
        }
      }, function errorCallback(response) {});
  }

  var cleanContent = function() {
    var tabContentWrapper = $('.cd-tabs-content');
    var selectedContent = tabContentWrapper.find('.tab[data-content="productsimple"]');
    selectedContent.addClass('selected').siblings('.tab').removeClass('selected');
  }

  // Show dialog with product info
  $scope.showProductDetail = function(id) {
    cleanContent();
  }

  // Show empty dialog
  $scope.showProductForm = function() {
    cleanContent();
  }

}]);
