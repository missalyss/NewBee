angular.module('app.inspect', [])

.controller('inspectAllCtrl', function($scope, $stateParams, $http, $state, inspectionService, moment) {

  $scope.$on('$ionicView.enter', function() {
    $scope.inspectionIndex = []
    inspectionService.all().then(result => {
      $scope.inspectionIndex = result.data
      $scope.inspectionIndex.forEach(element => {
        element.inspection_date = moment(element.inspection_date)
        .format('MMM DD')
      })
    })

  })

  $scope.showLog = function (log) {
        $state.go('tab.inspection-show', {id: log.id})
      }

})

.controller('inspectPostCtrl', function($scope, $stateParams, $http, $state, API_ENDPOINT, monitorService, moment) {
  $scope.newLog = {}
  $scope.newLog.inspection_date = moment().toDate()
  $scope.newLog.queen = false
  $scope.newLog.temperature
  $scope.newLog.humidity

  monitorService.all().then(result => {
    let index = result.data.length - 1
    $scope.newLog.humidity = result.data[index].humidity * 1
    $scope.newLog.temperature = result.data[index].temperature
    $scope.newLog.temperature = Math.round($scope.newLog.temperature * 1.8 + 32)
  })

  $scope.createLog = function (newLog) {
    $http.post(`${API_ENDPOINT.url}/inspections`, newLog).then(result => {
      $state.go('tab.inspect')
    })
  }

})

.controller('inspectShowCtrl', function($scope, $stateParams, $http, $state, inspectionService, API_ENDPOINT, $ionicPopup) {
  const id = $stateParams.id

  $scope.$on('$ionicView.enter', function () {

    $scope.thisLog = []
    inspectionService.all().then(result => {
      $scope.thisLog = result.data.filter(log => {
        return log.id == id
      })
      $scope.thisLog = $scope.thisLog[0]
      $scope.thisLog.inspection_date = moment($scope.thisLog.inspection_date).format('ddd MMM D, YYYY')

      !$scope.thisLog.notes ? $scope.thisLog.notes = "Not recorded" : $scope.thisLog.notes
      $scope.thisLog.queen = !$scope.thisLog.queen ? "Nope" : "Yes!"

      $scope.thisLog.brood_age =
        !$scope.thisLog.brood_age ? "Not recorded" :
        $scope.thisLog.brood_age === "egg" ? "Egg" :
        $scope.thisLog.brood_age === "young_larva" ? "Young Larva" :
        $scope.thisLog.brood_age === "med_larva" ? "Medium Larva" :
        $scope.thisLog.brood_age === "large_larva" ? "Large Larva" :
        $scope.thisLog.brood_age === "capped" ? "Capped" : "Not Applicable"

      $scope.thisLog.egg_pattern =
        !$scope.thisLog.egg_pattern ? "Adequate" :
        $scope.thisLog.egg_pattern == 1 ? "Very spotty 👎" :
        $scope.thisLog.egg_pattern == 2 ? "Pretty spotty" :
        $scope.thisLog.egg_pattern == 3 ? "Adequate" :
        $scope.thisLog.egg_pattern == 4 ? "Pretty solid" : "Solid 👍"

        $scope.thisLog.temperment =
          !$scope.thisLog.temperment ? "😶" :
          $scope.thisLog.temperment == 1 ? "😖" :
          $scope.thisLog.temperment == 2 ? "😕" :
          $scope.thisLog.temperment == 3 ? "😶" :
          $scope.thisLog.temperment == 4 ? "🙂" : "😊"

    })
  })

  $scope.editLog = function (log) {
    $state.go('tab.inspection-edit', {id: log.id})
  }

  $scope.deleteLog = function (log) {
    var deleteAccountPopup = $ionicPopup.confirm({
      title: 'Are you sure you want to delete this inspection?',
      template: 'You cannot undo this action.'
    })

    deleteAccountPopup.then((res) => {
      if(res) {
        $http.delete(`${API_ENDPOINT.url}/inspections/${log.id}`).then(result => {
          $state.go('tab.inspect')
        })
      }
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
      $scope.updateLog.inspection_date = moment($scope.updateLog.inspection_date).toDate()
      console.log($scope.updateLog);
    })
  })

  $scope.editLog = function (updatedLog) {
    $http.put(`${API_ENDPOINT.url}/inspections/${id}`, updatedLog).then(result => {
      $state.go('tab.inspection-show', {id})
    })
  }

})
