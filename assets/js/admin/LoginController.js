angular.module('AteneaApp', []).controller('LoginController', [
  '$scope',
  '$http',
  function($scope, $http) {
    $scope.user = {};

    $scope.loginEmployee = function(form) {
      if (form) {
        $http({method: "PUT", url: '/api/v0/login', data: $scope.user}).then(function successCallback(response) {
          var data = response.data;
          if (data.status == 200) {
            window.location.href = "/dashboard";
          }
        }, function errorCallback(response) {});
      }
    }
  }
]);
