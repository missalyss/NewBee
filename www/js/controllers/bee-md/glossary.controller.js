angular.module('app.glossary', [])

.controller('glossaryCtrl', function ($scope, $state, glossaryService) {

  $scope.$on('$ionicView.enter', function() {
    glossaryService.all().then(result => {
      $scope.glossary = result.data
    })
  })

  $scope.showTerm = function (term) {
    $state.go('tab.resources-glossary-show', {id: term.id})
  }
})

.controller('glossaryShowCtrl', function ($scope, $stateParams, glossaryService) {
  const id = $stateParams.id

  $scope.$on('$ionicView.enter', function() {
    $scope.thisTerm = []

    glossaryService.all().then(result => {
      $scope.thisTerm = result.data.filter(term => {
        return term.id == id
      })
      $scope.thisTerm = $scope.thisTerm[0]
    })
  })

})
