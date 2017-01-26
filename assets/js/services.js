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
