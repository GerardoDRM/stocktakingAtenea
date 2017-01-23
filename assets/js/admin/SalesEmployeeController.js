angular.module('AteneaApp', []).controller('SalesEmployeeController', ['$scope', '$http', '$compile', function($scope, $http, $compile) {


  var dialog = document.getElementById('ticketDialog');




  // Show empty dialog
  $scope.showTicketDialog = function() {
    dialog.showModal();
  }


  // Activate Function depends on status

  $scope.closeDialog = function() {
    dialog.close();
  }


}]);
