angular.module('app.inspect', [])

.controller('inspectCtrl',['$scope', '$stateParams', '$http', '$state', function($scope, $stateParams, $http, $state) {
  const apiUrl = 'https://internet-of-stings.herokuapp.com'

  $scope.inspectionsAll = []
  $scope.newLog = {}
  $scope.newLog.inspection_date = new Date()
  $scope.newLog.queen = false
  $scope.newLog.honey = false


  $scope.createLog = function (newLog) {
    $http.post(`${apiUrl}/inspections`, newLog).then(result => {
      console.log(result.data);
      $state.go('tab.inspect')
    })
  }

  console.log($scope.inspectionsAll);
}])
