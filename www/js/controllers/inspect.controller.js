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

  $scope.editLog = function (log) {
    $state.go('tab.inspection-edit', {id: log.id})
  }
}])

.controller('inspectEditCtrl', ['$scope', '$stateParams', '$http', '$state', function($scope, $stateParams, $http, $state) {

  const apiUrl = `https://internet-of-stings.herokuapp.com/inspections`
  const id = $stateParams.id
  $scope.updateLog = {}

  $scope.$on('$ionicView.enter', function () {

    $http.get(`${apiUrl}/${id}`).then(result => {
        $scope.updateLog = result.data[0]
        $scope.updateLog.inspection_date = new Date($scope.updateLog.inspection_date)
    })
  })

  $scope.editLog = function (updatedLog) {
    $http.put(`${apiUrl}/${id}`, updatedLog).then(result => {
      console.log(updatedLog);
      $state.go('tab.inspect')
    })
  }

}])
