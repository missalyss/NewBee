angular.module('app.treatments', [])

.controller('treatmentsCtrl', function ($scope, $stateParams, $state, treatmentsService) {

  $scope.$on('$ionicView.enter', function() {
    treatmentsService.all().then(result => {
      $scope.treatments = result.data
      console.log($scope.treatments);
    })
  })

  $scope.showTreatment = function (treatment) {
      $state.go('tab.resources-treatments-show', {id: treatment.id})
    }
})

.controller('treatmentsShowCtrl', function ($scope, $stateParams, treatmentsService) {
  const id = $stateParams.id

  $scope.$on('$ionicView.enter', function() {
    $scope.thisTreatment = []

    treatmentsService.all().then(result => {
      $scope.thisTreatment = result.data.filter(term => {
        return term.id == id
      })
      $scope.thisTreatment = $scope.thisTreatment[0]
    })
  })

})
