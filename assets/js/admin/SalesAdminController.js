app.controller('SalesAdminController', [
  '$scope',
  '$http',
  '$compile',
  'filterBranch',

  function($scope, $http, $compile, filterBranch) {

    $scope.tickets = [];
    var backTickets = [];
    $scope.ticket = {};
    $scope.branches = [];
    $scope.branch = undefined;
    var dialog = document.getElementById('salesDialog');

    $("#salesBtn").click(function() {
      init();
    });

    // Get branches list
    $scope.getAllBranches = function() {
      $http({method: "GET", url: '/api/v0/branches'}).then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          var branches = data.branches;
          $scope.branches = branches;
        }
      }, function errorCallback(response) {});
    }

    // Get all sales list
    $scope.getAllSales = function() {
      $http({method: "GET", url: '/api/v0/all_sales'}).then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          // Copy to tickets array
          $scope.tickets = data.data;
          backTickets = data.data;

        }
      }, function errorCallback(response) {});
    }

    var init = function() {
      $scope.getAllBranches();
      $scope.getAllSales();
    }

    $scope.changeData = function() {
      $scope.tickets = filterBranch(backTickets, $scope.branch["idbranch"]);
    }

    // Get ticket details
    var getTicketDetails = function(id) {
      $http({
        method: "GET",
        url: '/api/v0/ticket_details',
        params: {
          "idTicket": id
        }
      }).then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          // Copy to tickets array
          $scope.ticket["idTicket"] = id;
          $scope.ticket["products"] = data.data;
        }
      }, function errorCallback(response) {});
    }

    // Show empty dialog
    $scope.showSalesDialog = function(id) {
      getTicketDetails(id)
      dialog.showModal();
    }

    // Activate Function depends on status

    $scope.closeDialog = function() {
      dialog.close();
    }

  }
]);
