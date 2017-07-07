angular.module('app.resources', [])

.controller('resourceCtrl', ['$scope', '$stateParams', '$http',
function($scope, $stateParams, $http) {

  const apiUrl = `https://bee-md.herokuapp.com`

  // $scope.getAllSymptoms = function() {
    $http.get(`${apiUrl}/symptoms`).then(result => {
      $scope.data = result.data
      console.log($scope.data);
    })
  // }

    $http.get(`${apiUrl}/causes`).then(result => {

    })
}])
