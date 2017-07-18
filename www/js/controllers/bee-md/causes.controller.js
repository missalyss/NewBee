angular.module('app.causes', [])

.controller('causesCtrl', function ($scope, $state, beeMDService) {

  $scope.$on('$ionicView.enter', function() {
    beeMDService.all('causes').then(result => {
      $scope.causes = result.data
    })
  })

  $scope.showCause = function (cause) {
      $state.go('tab.resources-causes-show', {id: cause.id})
    }
})

.controller('causesShowCtrl', function ($scope, $stateParams, $state, beeMDService) {
  const id = $stateParams.id
  $scope.thisCause = {}
  $scope.theseSymptoms = []
  $scope.theseTreatments = []

  $scope.$on('$ionicView.enter', function() {

    beeMDService.one('causes', id).then(result => {
      $scope.thisCause = result.data.causeSympt[0]
      $scope.theseSymptoms = result.data.causeSympt
      $scope.theseTreatments = result.data.causeTreat
    })
  })

  $scope.glossaryLink = function(cause_gloss_id) {
    $state.go('tab.resources-glossary-show', {id: cause_gloss_id})
  }

  $scope.symptomLink = function (symptom_id) {
    $state.go('tab.resources-symptoms-show', {id: symptom_id})
  }

  $scope.treatmentLink = function (treatment_id) {
    $state.go('tab.resources-treatments-show', {id: treatment_id})
  }

})
