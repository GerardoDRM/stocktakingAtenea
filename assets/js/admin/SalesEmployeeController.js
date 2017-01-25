app.controller('SalesEmployeeController', ['$scope', '$http', '$compile', function($scope, $http, $compile) {

  $scope.tickets = [];
  $scope.ticket = {};
  $scope.products = [];
  $scope.product = {};

  var dialog = document.getElementById('ticketDialog');

  // Get all sales list
  $scope.getAllSalesEmployee = function() {
    $http({
        method: "GET",
        url: '/api/v0/return_products_employee'
      })
      .then(function successCallback(response) {

        var data = response.data;

        if (data.status == 200) {
          // Copy to tickets array
          $scope.tickets = data.data;
          var a = data.data
          console.log(a);

        }
      }, function errorCallback(response) {});
  }

  $scope.getAllSalesEmployee();

  // Get all sales list
  $scope.getAllProducts = function() {
    $http({
        method: "GET",
        url: '/api/v0/products_employee'
      })
      .then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          // Copy to tickets array
          $scope.products = data.data;
          console.log("hola")

        }
      }, function errorCallback(response) {


      });
  }

  $scope.getAllProducts();






  // Show empty dialog
  $scope.showTicketDialog = function() {
    dialog.showModal();
  }


  // Activate Function depends on status

  $scope.closeDialog = function() {
    dialog.close();
  }


}]);
