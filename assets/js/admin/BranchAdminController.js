app.controller('BranchAdminController', ['$scope', '$http', '$compile', function($scope, $http, $compile) {

  $scope.getBranches = function() {
    $http({
        method: "GET",
        url: 'localhost:/api/v0/branches'
      })
      .then(function successCallback(response) {
        var branches = response.data.branches;
        for (var i = 0; i < branches.length; i = i + 3) {

          for (var j = 0; j < 3; j++) {
            _addBranches(branches[i + j]);
          }
        }
      }, function errorCallback(response) {});

  }

  $scope.getBranches();


  $scope.createBranch = function() {
    $http({
        method: "POST",
        url: 'localhost:/api/v0/branch'
      })
      .then(function successCallback(response) {


      }, function errorCallback(response) {});

  }

  $scope.createBranch();





}]);
