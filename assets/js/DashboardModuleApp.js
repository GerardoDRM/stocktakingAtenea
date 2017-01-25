var app = angular.module('AteneaApp', []);
app.directive("fileread", [
  '$http',
  function($http) {
    return {
      scope: true,
      restrict: 'EA',
      link: function(scope, element, attributes, controller) {
        element.bind("change", function(changeEvent) {
          var reader = new FileReader();
          reader.onload = function(loadEvent) {
            scope.$apply(function() {
              var data = loadEvent.target.result;
              var secureFile = data.match(/^data:image\/(png|jpg|jpeg|JPG)/) != null
                ? true
                : false;
              if (secureFile) {
                // Check file size
                if (changeEvent.target.files[0].size < 5000000) {
                  // Upload Photo
                  var fd = new FormData();
                  fd.append('product', changeEvent.target.files[0]);
                  console.log(changeEvent.target.files[0]);
                  $http.put("/api/v0/product/image/CA120", fd, {
                    transformRequest: angular.identity,
                    headers: {
                      'Content-Type': undefined
                    }
                  }).success(function(response) {
                    var data = response.status;
                    if (data == 200) {
                      setTimeout(function() {
                        scope.getFiles();
                      }, 3000);
                    }
                  }).error(function(response) {});

                } else {
                  console.log("El tamaño de la imagen tiene que ser menor a 5MB");
                }
              } else {
                console.log("Debes de adjuntar una imagen con formato jpg, jpeg, JPG ó png");
              }
            });
          };
          reader.readAsDataURL(changeEvent.target.files[0]);
        });
      }
    }
  }
]);
