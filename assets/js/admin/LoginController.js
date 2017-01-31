var app = angular.module('AteneaApp', []);
app.controller('LoginController', [
  '$scope',
  '$http',
  'showToast',
  function($scope, $http, showToast) {
    $scope.user = {};

    $scope.loginEmployee = function(form) {
      if (form) {
        $http({method: "PUT", url: '/api/v0/login', data: $scope.user}).then(function successCallback(response) {
          var data = response.data;
          if (data.status == 200) {
            showToast("Has ingresado a Atenea");
             window.location.href = "/dashboard";
          }
        }, function errorCallback(response) {});
      }
    }
  }

]);
