app.controller('BranchAdminController', ['$scope', '$http', '$compile', 'showToast', function($scope, $http, $compile, showToast) {

  $scope.branches = [];
  $scope.branch = {};
  var dialog = document.getElementById('branchDialog');
  var dialogState = undefined;

  $("#branchesBtn").click(function() {
    $scope.getAllBranches();
  });

  // Create new branch
  var createBranch = function() {
    $http({
        method: "POST",
        url: '/api/v0/branch',
        data: $scope.branch
      })
      .then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          showToast("Has agregado una nueva Sucursal");
          dialog.close();
          $scope.getAllBranches();
        }
      }, function errorCallback(response) {});
  }

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
          for (var b in branches) {
            branches[b].address = branches[b].street + " " + branches[b].city + " " + branches[b].state;
          }
          $scope.branches = branches;

        }
      }, function errorCallback(response) {});
  }

  // Get branches list
  $scope.getBranchById = function(id) {
    $scope.branch = {};
    $http({
        method: "GET",
        url: '/api/v0/branches/' + id
      })
      .then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          // Create address
          $scope.branch = data.branch;
        }
      }, function errorCallback(response) {});
  }

  // Update Employees
  var updateBranch = function() {
    var id = $scope.branch["idbranch"];
    $http({
        method: "PUT",
        url: '/api/v0/branches/' + id,
        data: $scope.branch
      })
      .then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          showToast("Se ha actualizado la sucursal correctamente");
          dialog.close();
          $scope.getAllBranches();
        }
      }, function errorCallback(response) {});
  }

  // Delete Employees
  $scope.deleteBranch = function(id) {
    $http({
        method: "DELETE",
        url: '/api/v0/branches/' + id
      })
      .then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          showToast("Se ha eliminado la sucursal correctamente");
          $scope.getAllBranches();
        }
      }, function errorCallback(response) {});
  }

  var initDialog = function() {
    if (!dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
  }
  // Show dialog with branch info
  $scope.showBranchDetail = function(id) {
    // initDialog();
    dialog.showModal();
    $scope.getBranchById(id);
    dialogState = 1;
  }

  // Show empty dialog
  $scope.showBranchForm = function() {
    dialog.showModal();
    dialogState = 0;
    $scope.branch = {};
  }

  $scope.closeDialog = function() {
    dialog.close();
  }

  // Activate Function depends on status
  $scope.storeData = function(form) {
    if (form) {
      // Create a new branch
      if (dialogState == 0) {
        createBranch();
      } else if (dialogState == 1) { // Update Employee data
        updateBranch();
      }
    }
  }


}]);
