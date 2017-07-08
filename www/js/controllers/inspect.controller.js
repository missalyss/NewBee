angular.module('app.inspect', [])

.controller('inspectAllCtrl',['$scope', '$stateParams', '$http', '$state', function($scope, $stateParams, $http, $state) {
  const apiUrl = 'https://internet-of-stings.herokuapp.com/inspections'

  $scope.inspectionsAll = []

  $scope.$on('$ionicView.enter', function() {
    $http.get(apiUrl).then(result => {
      result.data.forEach(log => {
        $scope.inspectionsAll.push(log)
      })
    })

  })

}])

.controller('inspectPostCtrl',['$scope', '$stateParams', '$http', '$state', function($scope, $stateParams, $http, $state) {
  const apiUrl = 'https://internet-of-stings.herokuapp.com/inspections'

  $scope.newLog = {}
  $scope.newLog.inspection_date = new Date()
  $scope.newLog.queen = false
  $scope.newLog.honey = false

  $scope.createLog = function (newLog) {
    $http.post(apiUrl, newLog).then(result => {
      console.log(result.data);
      $state.go('tab.inspect')
    })
  }

}])

.controller('inspectShowCtrl',['$scope', '$stateParams', '$http', '$state', function($scope, $stateParams, $http, $state) {
  const apiUrl = `https://internet-of-stings.herokuapp.com/inspections/${id}`

  $scope.showLog = function (log) {
    $http.get(`${apiUrl}/${id}`).then(result => {
      console.log(result.data);
    })
  }
}])
