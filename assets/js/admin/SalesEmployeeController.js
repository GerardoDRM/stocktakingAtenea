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
    $scope.displayTickets = [];
    var backTickets = [];
    $scope.ticket = {};
    $scope.return = {};

    // Cart
    $scope.products = [];
    $scope.displayProducts = [];
    var backProducts = [];
    $scope.product = {};

    // Orders
    $scope.orders = [];
    $scope.displayOrders = [];
    var backOrders = [];
    $scope.order = {};


    $scope.shop_cart = [];
    $scope.cart_elements = 0;
    $scope.shop = {};
    $scope.total_ticket = 0;
    $scope.pg = {
      "start": 1,
      "per_page": 15,
      "size": 1
    };

    $scope.goToPageTicket = function(page) {
      // display products
      var start = (page - 1) * $scope.pg["per_page"];
      var end = start + $scope.pg["per_page"];
      $scope.displayTickets = $scope.tickets.slice(start, end);
    }


    $scope.goToPageProducts = function(page) {
      // display products
      var start = (page - 1) * $scope.pg["per_page"];
      var end = start + $scope.pg["per_page"];
      $scope.displayProducts = $scope.tickets.slice(start, end);
    }


    $scope.goToPageOrders = function(page) {
      // display products
      var start = (page - 1) * $scope.pg["per_page"];
      var end = start + $scope.pg["per_page"];
      $scope.displayOrders = $scope.orders.slice(start, end);
    }

    var dialog = document.getElementById('ticketDialog');

    //////////////////////////////////////////
    //////// Cart management /////////////
    /////////////////////////////////////////
    $scope.changeManage = function() {
      $scope.products = filterBranch(backProducts, $scope.branch["idbranch"]);
      // pagination size
      $scope.pg["size"] = Math.ceil($scope.products.length);
      // display products
      $scope.displayProducts = $scope.products.slice(0, $scope.pg["per_page"]);
    }

    $scope.searchById = function() {
      $scope.products = filterProduct(backProducts, $scope.searchId);
      // pagination size
      $scope.pg["size"] = Math.ceil($scope.products.length);
      // display products
      $scope.displayProducts = $scope.products.slice(0, $scope.pg["per_page"]);
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
          // pagination size
          $scope.pg["size"] = Math.ceil($scope.products.length);
          // display products
          $scope.displayProducts = $scope.products.slice(0, $scope.pg["per_page"]);
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
        product["total_price"] = product["price"];
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
      // pagination size
      $scope.pg["size"] = Math.ceil($scope.tickets.length);
      // display products
      $scope.displayProducts = $scope.tickets.slice(0, $scope.pg["per_page"]);
    }

    // Get all sales list
    var getAllSalesEmployee = function() {
      $http({method: "GET", url: '/api/v0/return_products_employee'}).then(function successCallback(response) {
        var data = response.data;
        if (data.status == 200) {
          // Copy to tickets array
          $scope.tickets = data.data;
          backTickets = data.data;
          // pagination size
          $scope.pg["size"] = Math.ceil($scope.tickets.length);
          // display products
          $scope.displayTickets = $scope.tickets.slice(0, $scope.pg["per_page"]);
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
