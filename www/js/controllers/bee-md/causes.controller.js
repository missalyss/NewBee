angular.module('app.causes', [])

.controller('causesCtrl', function ($scope, $state, causesService) {

  $scope.$on('$ionicView.enter', function() {
    causesService.all().then(result => {
      $scope.causes = result.data
      console.log(result.data);
    })
  })

  $scope.showCause = function (cause) {
      $state.go('tab.resources-causes-show', {id: cause.causes_id})
    }
})

.controller('causesShowCtrl', function ($scope, $stateParams, $state, causesService) {
  const id = $stateParams.id

  $scope.$on('$ionicView.enter', function() {
    $scope.thisCause = []

    causesService.all().then(result => {
      $scope.thisCause = result.data.filter(term => {
        return term.causes_id == id
      })
      $scope.thisCause = $scope.thisCause[0]
    })
  })

  $scope.glossaryLink = function(glossary_pk_id) {
    $state.go('tab.resources-glossary-show', {id: glossary_pk_id})
  }

})
