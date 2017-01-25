app.controller('SalesEmployeeController', [
  '$scope',
  '$http',
  '$compile',
  function($scope, $http, $compile) {
    $scope.branches = [];
    $scope.branch = undefined;

    $scope.tickets = [];
    $scope.ticket = {};
    $scope.products = [];
    $scope.product = {};

    var dialog = document.getElementById('ticketDialog');

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

    // Get all sales list
    var getAllSalesEmployee = function() {
      $http({
        method: "GET",
        url: '/api/v0/return_products_employee'
      }).then(function successCallback(response) {

        var data = response.data;

        if (data.status == 200) {
          // Copy to tickets array
          $scope.tickets = data.data;
          var a = data.data
        }
      }, function errorCallback(response) {});
    }

    // Get all sales list
    $scope.getAllProducts = function() {
      $http({
        method: "GET",
        url: '/api/v0/products_employee'
      }).then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          // Copy to tickets array
          $scope.products = data.data;
        }
      }, function errorCallback(response) {});
    }

    // Return Products
    $scope.returnProduct = function() {
      $http({
        method: "PUT",
        url: '/api/v0/return_ticket',
        data: {
          "iddetail": "",
          "idticket": "",
          "date": new Date()
        }
      }).then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          // Copy to tickets array
          $scope.products = data.data;
        }
      }, function errorCallback(response) {});
    }

    var init = function() {
      getAllBranches();
      getAllSalesEmployee();
      $scope.getAllProducts();
    }

    init();

    // Show empty dialog
    $scope.showTicketDialog = function() {
      dialog.showModal();
    }

    // Activate Function depends on status

    $scope.closeDialog = function() {
      dialog.close();
    }

  }
]);
