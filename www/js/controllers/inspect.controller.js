angular.module('app.inspect', [])

.controller('inspectCtrl',['$scope', '$stateParams', '$http', '$state', function($scope, $stateParams, $http, $state) {
  const apiUrl = 'https://internet-of-stings.herokuapp.com/inspections'

  $scope.inspectionsAll = []
  $scope.newLog = {}
  $scope.newLog.inspection_date = new Date()
  $scope.newLog.queen = false
  $scope.newLog.honey = false

  $scope.$on('$ionicView.enter', function() {
    $http.get(apiUrl).then(result => {
      result.data.forEach(log => {
        $scope.inspectionsAll.push(log)
      })
    })

  })

  $scope.createLog = function (newLog) {
    $http.post(apiUrl, newLog).then(result => {
      console.log(result.data);
      $state.go('tab.inspect')
    })
  }

}])
