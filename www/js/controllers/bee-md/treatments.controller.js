angular.module('app.treatments', [])

.controller('treatmentsCtrl', function ($scope, $stateParams, $state, treatmentsService) {

  $scope.$on('$ionicView.enter', function() {
    treatmentsService.all().then(result => {
      $scope.treatments = result.data
    })
  })

  $scope.showTreatment = function (treatment) {
      $state.go('tab.resources-treatments-show', {id: treatment.id})
    }
})

.controller('treatmentsShowCtrl', function ($scope, $stateParams, $state, treatmentsService) {
  const id = $stateParams.id

  $scope.$on('$ionicView.enter', function() {
    $scope.thisTreatment = {}
    $scope.theseCauses = []

    treatmentsService.one(id).then(result => {
      $scope.thisTreatment = result.data[0]
      $scope.theseCauses = result.data
    })
  })

  $scope.causeLink = function(cause_id) {
    $state.go('tab.resources-causes-show', {id: cause_id})
  }

})
