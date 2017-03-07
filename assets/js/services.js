// Service wich store an empty object
app.factory("productObject", function() {
  var id = undefined;
  return {
    getID: function() {
      return id;
    },
    setID: function(data) {
      id = data;
    }
  };
});
app.factory("filterBranch", function() {
  return function(data, branch) {
    var elemen = [];
    for (var i in data) {
      if (data[i]["idbranch"] == branch) {
        elemen.push(data[i]);
      }
    }
    return elemen;
  }
});

app.factory("filterProduct", function() {
  return function(data, word) {
    var elem = [];
    for (var i in data) {
      if (data[i]["idproduct"].toLowerCase().indexOf(word.toLowerCase()) > -1) {
        elem.push(data[i]);
      }
    }
    return elem;
  }
});

app.factory("showToast", function() {
  return function(msg) {
    var notification = document.querySelector('.mdl-js-snackbar');
    notification.MaterialSnackbar.showSnackbar({
      message: msg
    });
  }
});
