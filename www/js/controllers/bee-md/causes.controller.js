angular.module('app.causes', [])

.controller('causesCtrl', function ($scope, $state, causesService) {

  $scope.$on('$ionicView.enter', function() {
    causesService.all().then(result => {
      $scope.causes = result.data
    })
  })

  $scope.showCause = function (cause) {
      $state.go('tab.resources-causes-show', {id: cause.causes_id})
    }
})

.controller('causesShowCtrl', function ($scope, $stateParams, $http, BEE_MD_ENDPOINT, $state, causesService) {
  const id = $stateParams.id
  $scope.thisCause = {}
  $scope.theseSymptoms = []

  $scope.$on('$ionicView.enter', function() {

    causesService.one(id).then(result => {
      $scope.thisCause = result.data[0]
      console.log(result.data);
      $scope.theseSymptoms = result.data
      console.log('these ', $scope.theseSymptoms);
    })
  })

  $scope.glossaryLink = function(cause_gloss_id) {
    $state.go('tab.resources-glossary-show', {id: cause_gloss_id})
  }

  $scope.symptomLink = function (symptom_id) {
    $state.go('tab.resources-symptoms-show', {id: symptom_id})

  }

})
