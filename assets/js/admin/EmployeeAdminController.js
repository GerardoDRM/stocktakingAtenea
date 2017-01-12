app.controller('EmployeeAdminController', ['$scope', '$http', '$compile', function($scope, $http, $compile) {

  $scope.employees = [];
  $scope.employee = {};
  var dialog = document.getElementById('employeeDialog');

  // Create new employee
  $scope.signupEmployee = function() {
    $http({
        method: "POST",
        url: '/api/v0/signup',
        data: $scope.employee
      })
      .then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          console.log("Ok");
        }
      }, function errorCallback(response) {});
  }

  // Get employees list
  $scope.getAllEmployees = function() {
    $http({
        method: "GET",
        url: '/api/v0/employees'
      })
      .then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          $scope.employees = data.employees;
        }
      }, function errorCallback(response) {});
  }

  // Get employees list
  $scope.getEmployeeById = function(id) {
    $scope.employee = {};
    $http({
        method: "GET",
        url: '/api/v0/employees/' + id
      })
      .then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          $scope.employee = response
        }
      }, function errorCallback(response) {});
  }

  // Update Employees
  $scope.updateEmployee = function(id) {
    $http({
        method: "PUT",
        url: '/api/v0/employees' + id,
        data: $scope.employee
      })
      .then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          console.log("Updated");
        }
      }, function errorCallback(response) {});
  }

  // Delete Employees
  $scope.deleteEmployee = function(id) {
    $http({
        method: "DELETE",
        url: '/api/v0/employees/' + id
      })
      .then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          console.log("Deleted");
        }
      }, function errorCallback(response) {});
  }

  var initDialog = function() {
    if (!dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
  }
  // Show dialog with employee info
  $scope.showEmployeeDetail = function(id) {
    // initDialog();
    console.log(dialog);
    dialog.showModal();
    $scope.getEmployeeById(id);
  }

  // Show empty dialog
  $scope.showEmployeeForm = function() {
    dialog.showModal();
  }

  $scope.closeDialog = function() {
    dialog.close();
  }

}]);
