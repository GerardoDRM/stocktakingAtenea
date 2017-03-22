app.controller('ProductAdminController', [
  '$scope',
  '$rootScope',
  '$http',
  '$compile',
  'productObject',
  'filterBranch',
  'filterProduct',
  'showToast',
  function($scope, $rootScope, $http, $compile, productObject, filterBranch, filterProduct, showToast) {

    $scope.branches = [];
    $scope.branch = undefined;
    $scope.products = [];
    $scope.displayProducts = [];
    var productsBack = [];
    $scope.product = {};
    var dialogState = undefined;
    $scope.po = productObject;
    $scope.pg = {
      "start": 1,
      "per_page": 15,
      "size": 1
    };

    $scope.goToPage = function(page) {
      // display products
      var start = (page - 1) * $scope.pg["per_page"];
      var end = start + $scope.pg["per_page"];
      $scope.displayProducts = $scope.products.slice(start, end);
    }

    $("#productsBtn").click(function() {
      init();
    });

    // Get branches list
    $scope.getAllBranches = function() {
      $http({method: "GET", url: '/api/v0/branches'}).then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          var branches = data.branches;
          $scope.branches = branches;
        }
      }, function errorCallback(response) {});
    }

    // Get products list
    $scope.getAllProducts = function() {
      $http({method: "GET", url: '/api/v0/products'}).then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          $scope.products = data.products;
          productsBack = data.products;
          // pagination size
          $scope.pg["size"] = Math.ceil($scope.products.length);
          // display products
          $scope.displayProducts = $scope.products.slice(0, $scope.pg["per_page"]);

        }
      }, function errorCallback(response) {});
    }

    var init = function() {
      $scope.getAllBranches();
      $scope.getAllProducts();
    }
    // Init products and branches
    init();

    $scope.changeData = function() {
      $scope.products = filterBranch(productsBack, $scope.branch["idbranch"]);
      $scope.pg["size"] = Math.ceil($scope.products.length);
      // display products
      $scope.displayProducts = $scope.products.slice(0, $scope.pg["per_page"]);
    }

    $scope.searchById = function() {
      $scope.products = filterProduct(productsBack, $scope.searchId);
      $scope.pg["size"] = Math.ceil($scope.products.length);
      // display products
      $scope.displayProducts = $scope.products.slice(0, $scope.pg["per_page"]);
    }

    // Delete Products
    $scope.deleteProduct = function(id) {
      $http({
        method: "DELETE",
        url: '/api/v0/products/' + id
      }).then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          showToast("Has eliminado un producto");
          $scope.getAllProducts();
        }
      }, function errorCallback(response) {});
    }

    var cleanContent = function() {
      $rootScope.$emit("ProductMethodInit", {});
      var tabContentWrapper = $('.cd-tabs-content');
      var selectedContent = tabContentWrapper.find('.tab[data-content="productsimple"]');
      selectedContent.addClass('selected').siblings('.tab').removeClass('selected');
      $('.menu-click').removeClass('selected');
    }

    // Show dialog with product info
    $scope.showProductDetail = function(id) {
      $scope.po.setID(id);
      cleanContent();
    }

    // Show empty dialog
    $scope.showProductForm = function() {
      $scope.po.setID(undefined);
      cleanContent();
    }

  }
]);
