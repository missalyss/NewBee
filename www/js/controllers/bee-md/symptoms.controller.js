angular.module('app.symptoms', [])

.controller('symptomsCtrl', function ($scope, $state, symptomsService) {

  $scope.$on('$ionicView.enter', function() {
    symptomsService.all().then(result => {
      $scope.symptoms = result.data
    })
  })

  $scope.showSymptom = function (symptom) {
      $state.go('tab.resources-symptoms-show', {id: symptom.symptoms_id})
    }

})

.controller('symptomsShowCtrl', function ($scope, $stateParams, $state, symptomsService) {
  const id = $stateParams.id

  $scope.$on('$ionicView.enter', function() {
    $scope.thisSymptom = {}
    $scope.theseCauses = []

    symptomsService.one(id).then(result => {
      console.log(result.data);
      $scope.thisSymptom = result.data[0]
      $scope.theseCauses = result.data
      console.log($scope.thisSymptom)
    })
  })

  $scope.glossaryLink = function(glossary_id) {
    $state.go('tab.resources-glossary-show', {id: glossary_id})
  }

  $scope.causeLink = function(cause_id) {
    $state.go('tab.resources-causes-show', {id: cause_id})
  }

})
