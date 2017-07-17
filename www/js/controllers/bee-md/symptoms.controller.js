angular.module('app.symptoms', [])

.controller('symptomsCtrl', function ($scope, $state, symptomsService) {

  $scope.$on('$ionicView.enter', function() {
    symptomsService.all().then(result => {
      $scope.symptoms = result.data
    })
  })

  $scope.showSymptom = function (symptom) {
      $state.go('tab.resources-symptoms-show', {id: symptom.id})
    }

})

.controller('symptomsShowCtrl', function ($scope, $stateParams, symptomsService) {
  const id = $stateParams.id

  $scope.$on('$ionicView.enter', function() {
    $scope.thisSymptom = []

    symptomsService.all().then(result => {
      $scope.thisSymptom = result.data.filter(term => {
        return term.id == id
      })
      $scope.thisSymptom = $scope.thisSymptom[0]
    })
  })

})
