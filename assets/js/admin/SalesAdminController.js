app.controller('SalesAdminController', [
  '$scope',
  '$http',
  '$compile',
  'filterBranch',

  function($scope, $http, $compile, filterBranch) {

    $scope.tickets = [];
    $scope.displayTickets = [];
    var backTickets = [];
    $scope.ticket = {};
    $scope.branches = [];
    $scope.branch = undefined;
    var dialog = document.getElementById('salesDialog');
    $scope.pg = {
      "start": 1,
      "per_page": 15,
      "size": 1
    };

    $scope.goToPage = function(page) {
      // display products
      var start = (page - 1) * $scope.pg["per_page"];
      var end = start + $scope.pg["per_page"];
      $scope.displayTickets = $scope.tickets.slice(start, end);
    }


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
          // pagination size
          $scope.pg["size"] = Math.ceil($scope.tickets.length);
          // display tickets
          $scope.displayTickets = $scope.tickets.slice(0, $scope.pg["per_page"]);

        }
      }, function errorCallback(response) {});
    }

    var init = function() {
      $scope.getAllBranches();
      $scope.getAllSales();
    }

    $scope.changeData = function() {
      $scope.tickets = filterBranch(backTickets, $scope.branch["idbranch"]);
      // pagination size
      $scope.pg["size"] = Math.ceil($scope.tickets.length);
      // display tickets
      $scope.displayTickets = $scope.tickets.slice(0, $scope.pg["per_page"]);
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
