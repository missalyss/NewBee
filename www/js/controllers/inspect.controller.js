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

  $scope.showLog = function (log) {
        $state.go('tab.inspection-show', {id: log.id})
      }

}])

.controller('inspectPostCtrl',['$scope', '$stateParams', '$http', '$state', function($scope, $stateParams, $http, $state) {
  const apiUrl = 'https://internet-of-stings.herokuapp.com/inspections'

  $scope.newLog = {}
  $scope.newLog.inspection_date = new Date()
  $scope.newLog.queen = false
  $scope.newLog.honey = false

  $scope.createLog = function (newLog) {
    $http.post(apiUrl, newLog).then(result => {
      $state.go('tab.inspect')
    })
  }

}])

.controller('inspectShowCtrl',['$scope', '$stateParams', '$http', '$state', function($scope, $stateParams, $http, $state) {

  $scope.thisLog = []

  $scope.$on('$ionicView.enter', function () {
    const apiUrl = `https://internet-of-stings.herokuapp.com/inspections`
    const id = $stateParams.id

    $http.get(`${apiUrl}/${id}`).then(result => {
      result.data.forEach(log => {
        $scope.thisLog.push(log)
      })
    })
    
  })
}])
