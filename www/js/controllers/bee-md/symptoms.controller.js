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
    $scope.thisSymptom = []

    symptomsService.all().then(result => {
      $scope.thisSymptom = result.data.filter(term => {
        return term.symptoms_id == id
      })
      $scope.thisSymptom = $scope.thisSymptom[0]
      console.log($scope.thisSymptom);
    })
  })

  $scope.glossaryLink = function(glossary_pk_id) {
    $state.go('tab.resources-glossary-show', {id: glossary_pk_id})
  }

})
