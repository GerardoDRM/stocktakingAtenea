app.controller('ReturnAdminController', ['$scope', '$http', '$compile', function($scope, $http, $compile) {

  $scope.sales = [];
  $scope.sale = {};


  // Get all sales list
  $scope.getAllReturns = function() {
    $http({
        method: "GET",
        url: '/api/v0/return_products'
      })
      .then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          // Copy to tickets array
          $scope.sales = data.data;

        }
      }, function errorCallback(response) {


      });
  }

  $scope.getAllReturns();







}]);
