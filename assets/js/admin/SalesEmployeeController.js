app.controller('SalesEmployeeController', [
  '$scope',
  '$http',
  '$compile',
  'showToast',
  'filterBranch',
  'filterProduct',
  function($scope, $http, $compile, showToast, filterBranch, filterProduct) {
    $scope.branches = [];
    $scope.branch = undefined;
    // Returns
    $scope.tickets = [];
    var backTickets = [];
    $scope.ticket = {};
    $scope.return = {};

    // Cart
    $scope.products = [];
    var backProducts = [];
    $scope.product = {};

    $scope.shop_cart = [];
    $scope.cart_elements = 0;
    $scope.shop = {};
    $scope.total_ticket = 0;

    var dialog = document.getElementById('ticketDialog');

    //////////////////////////////////////////
    //////// Cart management /////////////
    /////////////////////////////////////////
    $scope.changeManage = function() {
      $scope.products = filterBranch(backProducts, $scope.branch["idbranch"]);
    }

    $scope.searchById = function() {
      $scope.products = filterProduct(backProducts, $scope.searchId);
    }

    // Get branches list
    var getAllBranches = function() {
      $http({method: "GET", url: '/api/v0/branches'}).then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          var branches = data.branches;
          $scope.branches = branches;
        }
      }, function errorCallback(response) {});
    }

    // Get all sales list
    var getAllProducts = function() {
      $http({method: "GET", url: '/api/v0/products_employee'}).then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          // Copy to tickets array
          $scope.products = data.data;
          backProducts = data.data;
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
      $scope.total_ticket = Math.round($scope.total_ticket * 100) / 100;
    }

    $scope.addElementCart = function(index) {
      // Add to cart
      // Check availability
      if ($scope.products[index]["quantity"] >= $scope.shop[index]["quantity"]) {
        var product = $scope.products[index];
        product["quantity_cart"] = $scope.shop[index]["quantity"];
        // product["total_price"] = product["price"] + (product["price"] * .16);
        product["total_price"] = product["price"] + product["price"];
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
      // Sales data
      $http({
        method: "POST",
        url: '/api/v0/create_ticket',
        data: {
          "ticket": ticket,
          "sales": $scope.shop_cart
        }
      }).then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          showToast("Se ha creado el ticket");
          // Update quantity on productdetails
          init();
          $scope.shop_cart = [];
          $scope.cart_elements = 0;
          $scope.shop = {};
          $scope.total_ticket = 0;
          $scope.closeDialog();
        } else {
          showToast("Se presento un error, vuelva a intentar");
        }
      }, function errorCallback(response) {});
    }

    //////////////////////////////////////////
    //////// Returns management /////////////
    /////////////////////////////////////////

    $scope.changeReturns = function() {
      $scope.tickets = filterBranch(backTickets, $scope.branch["idbranch"]);
    }

    // Get all sales list
    var getAllSalesEmployee = function() {
      $http({method: "GET", url: '/api/v0/return_products_employee'}).then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          // Copy to tickets array
          $scope.tickets = data.data;
          backTickets = data.data;
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
          "date": new Date(),
          "returnNum": $scope.return [index]["quantity"]
        }
      }).then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          showToast("Se ha actualizado la información");
          getAllSalesEmployee();
        } else {
          showToast("Se presento un error, vuelva a intentar");
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
