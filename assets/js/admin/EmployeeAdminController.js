app.controller('EmployeeAdminController', ['$scope', '$http', '$compile', 'showToast', function($scope, $http, $compile, showToast) {
  $scope.branches = [];
  $scope.branch = undefined;
  $scope.employees = [];
  $scope.employee = {};
  var dialog = document.getElementById('employeeDialog');
  var dialogState = undefined;

  $("#employeesBtn").click(function() {
    init();
  });


  // Get branches list
  $scope.getAllBranches = function() {
    $http({
        method: "GET",
        url: '/api/v0/branches'
      })
      .then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          var branches = data.branches;
          $scope.branches = branches;
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


  var init = function() {
    $scope.getAllBranches();
    $scope.getAllEmployees();
  }

  init();

  // Create new employee
  var signupEmployee = function() {
    // Get Branch id
    $scope.employee.workingAt = $scope.branch.idbranch;
    $http({
        method: "POST",
        url: '/api/v0/signup',
        data: $scope.employee
      })
      .then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          showToast("Has agregado un nuevo empleado");
          dialog.close();
          $scope.getAllEmployees();
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
          $scope.employee = data.employee;
          // Check branch
          for (var b in $scope.branches) {
            if ($scope.branches[b].idbranch == $scope.employee.workingAt) {
              $scope.branch = $scope.branches[b];
            }
          }
        }
      }, function errorCallback(response) {});
  }

  // Update Employees
  var updateEmployee = function() {
    var id = $scope.employee["idemployee"];
    $scope.employee.workingAt = $scope.branch.idbranch;
    $http({
        method: "PUT",
        url: '/api/v0/employees/' + id,
        data: $scope.employee
      })
      .then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          showToast("Has actualizado la información");
          console.log("Updated");
          $scope.getAllEmployees();
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
          showToast("Has eliminado a un empleado");
          $scope.getAllEmployees();
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
    dialog.showModal();
    $scope.getEmployeeById(id);
    dialogState = 1;
  }

  // Show empty dialog
  $scope.showEmployeeForm = function() {
    dialog.showModal();
    dialogState = 0;
    $scope.employee = {};
  }

  $scope.closeDialog = function() {
    dialog.close();
  }

  // Activate Function depends on status
  $scope.storeData = function(form) {
    if (form) {
      // Create a new employee
      if (dialogState == 0) {
        signupEmployee();
      } else if (dialogState == 1) { // Update Employee data
        updateEmployee();
      }
    }
  }

}]);
