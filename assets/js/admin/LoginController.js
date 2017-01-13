angular.module('AteneaApp', []).controller('LoginController', ['$scope', '$http', function($scope, $http) {
  $scope.user = {};

  $scope.loginEmployee = function(form) {
    if (form) {
      console.log($scope.user);
      $http({
          method: "PUT",
          url: '/api/v0/login',
          data: $scope.user
        })
        .then(function successCallback(response) {
          var data = response.data;
          console.log(data);
          if (data.status == 200) {
            window.location.href = "/dashboard";
          }
        }, function errorCallback(response) {
          console.log(response);
        });
    }
  }
}]);
