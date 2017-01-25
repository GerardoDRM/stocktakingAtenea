app.controller('SalesEmployeeController', [
  '$scope',
  '$http',
  '$compile',
  function($scope, $http, $compile) {
    $scope.branches = [];
    $scope.branch = undefined;
    // Returns
    $scope.tickets = [];
    $scope.ticket = {};
    // Cart
    $scope.products = [];
    $scope.product = {};

    $scope.shop_cart = [];
    $scope.cart_elements = 0;
    $scope.shop = {};
    $scope.total_ticket = 0;

    var dialog = document.getElementById('ticketDialog');

    //////////////////////////////////////////
    //////// Cart management /////////////
    /////////////////////////////////////////

    // Get branches list
    var getAllBranches = function() {
      $http({
        method: "GET",
        url: '/api/v0/branches'
      }).then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          var branches = data.branches;
          $scope.branches = branches;
        }
      }, function errorCallback(response) {});
    }

    // Get all sales list
    var getAllProducts = function() {
      $http({
        method: "GET",
        url: '/api/v0/products_employee'
      }).then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          // Copy to tickets array
          $scope.products = data.data;
          $scope.cart_elements = 0;
        }
      }, function errorCallback(response) {});
    }

    var calculateTotal = function() {
      var cart = $scope.shop_cart;
      $scope.total_ticket = 0;
      for (var p in cart) {
        $scope.total_ticket += cart[p]["total_price"] * cart[p]["quantity_cart"];
      }
    }

    $scope.addElementCart = function(index) {
      // Add to cart
      // Check availability
      if ($scope.products[index]["quantity"] >= $scope.shop[index]["quantity"]) {
        var product = $scope.products[index];
        product["quantity_cart"] = $scope.shop[index]["quantity"];
        product["total_price"] = product["price"] + (product["price"] * .16);
        $scope.shop_cart.push(product);
        $scope.cart_elements++;
        calculateTotal();
      }
    }

    $scope.removeElementCart = function(index) {
      $scope.cart_elements--;
      $scope.shop_cart.splice(index, 1);
      calculateTotal();
    }

    // Create ticket and Sale
    $scope.createTicket = function() {
      // Ticket data
      var ticket = {
        "date": new Date()
      };
      var sales = {
        "sales": $scope.shop_cart;
      }
      // Sales data
      $http({
        method: "POST",
        url: '/api/v0/create_ticket',
        data: {
          "ticket": ticket,
          "sales": sales
        }
      }).then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          // Update quantity on productdetails
          init();
        }
      }, function errorCallback(response) {});
    }


    //////////////////////////////////////////
    //////// Returns management /////////////
    /////////////////////////////////////////

    // Get all sales list
    var getAllSalesEmployee = function() {
      $http({
        method: "GET",
        url: '/api/v0/return_products_employee'
      }).then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          // Copy to tickets array
          $scope.tickets = data.data;
        }
      }, function errorCallback(response) {});
    }

    // Return Products
    $scope.returnProduct = function(index) {
      // Get Product
      var product = $scope.tickets[index];
      $http({
        method: "PUT",
        url: '/api/v0/update_return',
        data: {
          "iddetail": product["iddetail"],
          "idticket": product["ticket"],
          "date": new Date()
        }
      }).then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          getAllProducts();
        }
      }, function errorCallback(response) {});
    }

    // Init all sources
    var init = function() {
      getAllBranches();
      getAllSalesEmployee();
      getAllProducts();
    }

    init();

    // Show empty dialog
    $scope.showTicketDialog = function() {
      dialog.showModal();
    }

    // Activate Function depends on status

    $scope.closeDialog = function() {
      dialog.close();
    }

  }
]);
