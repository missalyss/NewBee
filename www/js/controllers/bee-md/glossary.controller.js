angular.module('app.glossary', [])

.controller('glossaryCtrl', function ($scope, $state, beeMDService) {

  $scope.$on('$ionicView.enter', function() {
    beeMDService.all('glossary').then(result => {
      $scope.glossary = result.data
    })
  })

  $scope.showTerm = function (term) {
    $state.go('tab.resources-glossary-show', {id: term.id})
  }
})

.controller('glossaryShowCtrl', function ($scope, $stateParams, beeMDService) {
  const id = $stateParams.id

  $scope.$on('$ionicView.enter', function() {
    $scope.thisTerm = []

    beeMDService.all('glossary').then(result => {
      $scope.thisTerm = result.data.filter(term => {
        return term.id == id
      })
      $scope.thisTerm = $scope.thisTerm[0]
    })
  })

})
