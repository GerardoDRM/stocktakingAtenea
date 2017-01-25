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
  return function(data, branches) {
    for (var i in data) {}
  }
});
