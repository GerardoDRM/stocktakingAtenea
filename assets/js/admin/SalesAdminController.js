app.controller('SalesAdminController', ['$scope', '$http', '$compile', function($scope, $http, $compile) {

  $scope.sales = [];
  $scope.sales = {};
  $scope.tickets = [];
  $scope.tickets = {};

  var dialog = document.getElementById('salesDialog');


  // Get products list
  $scope.getAllSales = function() {
    $http({
        method: "GET",
        url: '/api/v0/sales'
      })
      .then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          $scope.sales = data.sales;
        }
      }, function errorCallback(response) {});
  }

  $scope.getAllSales();


  // Create new sale
  var createSale = function() {
    // Get Branch id
  //  $scope.product.location = $scope.branch.idbranch;
    $http({
        method: "POST",
        url: '/api/v0/sales',
        data: $scope.sales
      })
      .then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          dialog.close();
          $scope.getAllSales();
        }
      }, function errorCallback(response) {});
  }







  // Show empty dialog
  $scope.showSalesDialog = function() {
    dialog.showModal();
  }


  // Activate Function depends on status

  $scope.closeDialog = function() {
    dialog.close();
  }





}]);
