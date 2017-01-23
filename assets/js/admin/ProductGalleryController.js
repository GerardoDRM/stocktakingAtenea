app.controller('ProductGalleryController', [
  '$scope',
  '$http',
  '$compile',
  'productObject',

  function($scope, $http, $compile, productObject) {

    $scope.detail = {};
    $scope.branches = [];
    // var po = productObject;
    var po = {
      "id": "CA213"
    };
  }
]);
