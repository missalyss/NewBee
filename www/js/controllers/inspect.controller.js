angular.module('app.inspect', [])

.controller('inspectAllCtrl', function($scope, $stateParams, $http, $state, inspectionService) {

  $scope.$on('$ionicView.enter', function() {
    $scope.inspectionIndex = []
    inspectionService.all().then(result => {
      $scope.inspectionIndex = result.data
    })

  })

  $scope.showLog = function (log) {
        $state.go('tab.inspection-show', {id: log.id})
      }

})

.controller('inspectPostCtrl', function($scope, $stateParams, $http, $state, API_ENDPOINT) {

  $scope.newLog = {}
  $scope.newLog.inspection_date = new Date()
  $scope.newLog.queen = false
  $scope.newLog.honey = false

  $scope.createLog = function (newLog) {
    $http.post(`${API_ENDPOINT.url}/inspections`, newLog).then(result => {
      $state.go('tab.inspect')
    })
  }

})

.controller('inspectShowCtrl', function($scope, $stateParams, $http, $state, inspectionService, API_ENDPOINT) {
  const id = $stateParams.id

  $scope.$on('$ionicView.enter', function () {

    $scope.thisLog = []
    inspectionService.all().then(result => {
      $scope.thisLog = result.data.filter(log => {
        return log.id == id
      })
      $scope.thisLog = $scope.thisLog[0]
    })
  })

  $scope.editLog = function (log) {
    $state.go('tab.inspection-edit', {id: log.id})
  }

  $scope.deleteLog = function (log) {
    $http.delete(`${API_ENDPOINT.url}/inspections/${log.id}`).then(result => {
      $state.go('tab.inspect')
    })
  }
})

.controller('inspectEditCtrl', function($scope, $stateParams, $http, $state, inspectionService, API_ENDPOINT) {

  const id = $stateParams.id

  $scope.$on('$ionicView.enter', function () {
    $scope.updateLog = []
    inspectionService.all().then(result => {
      $scope.updateLog = result.data.filter(log => {
        return log.id == id
      })
      $scope.updateLog = $scope.updateLog[0];
      $scope.updateLog.inspection_date = new Date($scope.updateLog.inspection_date)
      console.log($scope.updateLog);
    })
  })

  $scope.editLog = function (updatedLog) {
    $http.put(`${API_ENDPOINT.url}/inspections/${id}`, updatedLog).then(result => {
      $state.go('tab.inspection-show', {id})
    })
  }

})
