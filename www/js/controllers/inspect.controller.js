angular.module('app.inspect', [])

.controller('inspectAllCtrl',['$scope', '$stateParams', '$http', '$state', 'inspectionService', function($scope, $stateParams, $http, $state, inspectionService) {

  $scope.$on('$ionicView.enter', function() {
    $scope.inspectionIndex = []
    inspectionService.all().then(result => {
      $scope.inspectionIndex = result.data
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

.controller('inspectShowCtrl',['$scope', '$stateParams', '$http', '$state', 'inspectionService', function($scope, $stateParams, $http, $state, inspectionService) {
  const apiUrl = 'https://internet-of-stings.herokuapp.com/inspections'

  $scope.$on('$ionicView.enter', function () {
    inspectionService.thisLog().then(result => {
      $scope.thisLog = result.data[0]
    })
  })

  $scope.editLog = function (log) {
    $state.go('tab.inspection-edit', {id: log.id})
  }

  $scope.deleteLog = function (log) {
    $http.delete(`${apiUrl}/${log.id}`).then(result => {
      $state.go('tab.inspect')
    })
  }
}])

.controller('inspectEditCtrl', ['$scope', '$stateParams', '$http', '$state', 'inspectionService', function($scope, $stateParams, $http, $state, inspectionService) {

  const apiUrl = `https://internet-of-stings.herokuapp.com/inspections`
  const id = $stateParams.id
  $scope.updateLog = {}

  $scope.$on('$ionicView.enter', function () {
    inspectionService.thisLog().then(result => {
        $scope.updateLog = result.data[0]
        $scope.updateLog.inspection_date = new Date($scope.updateLog.inspection_date)
    })
  })

  $scope.editLog = function (updatedLog) {
    $http.put(`${apiUrl}/${id}`, updatedLog).then(result => {
      $state.go('tab.inspection-show')
    })
  }

}])
