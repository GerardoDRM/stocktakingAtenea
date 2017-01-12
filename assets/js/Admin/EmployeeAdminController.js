angular.module('Atenea').controller('EmployeeAdminController', ['$scope', '$http', '$compile', function($scope, $http, $compile) {

  $scope.logoutEmployee = function() {
    $http({
        method: "GET",
        url: 'localhost:/logout'
      })
      .then(function successCallback(response) {
        var logout = response.data;
        console.log(logout);

      }, function errorCallback(response) {});

  }

  $scope.logoutEmployee();


  $scope.loginEmployee = function() {
    $http({
        method: "PUT",
        url: 'localhost:/api/v0/login'
      })
      .then(function successCallback(response) {


      }, function errorCallback(response) {});

  }

  $scope.loginEmployee();


  $scope.signupEmployee = function() {
    $http({
        method: "POST",
        url: 'localhost:/api/v0/signup'
      })
      .then(function successCallback(response) {


      }, function errorCallback(response) {});

  }

  $scope.signupEmployee();







}]);
