angular.module('app.glossary', [])

.controller('glossaryCtrl', function ($scope, $state, BEE_MD_ENDPOINT, glossaryService) {

  $scope.$on('$ionicView.enter', function() {
    glossaryService.all().then(result => {
      $scope.glossary = result.data
    })
  })

  $scope.showTerm = function (term) {
    $state.go('tab.resources-glossary-show', {id: term.id})
  }
})

.controller('glossaryShowCtrl', function ($scope, $stateParams, BEE_MD_ENDPOINT, glossaryService) {
  const id = $stateParams.id

  $scope.$on('$ionicView.enter', function() {
    $scope.thisTerm = []

    glossaryService.all().then(result => {
      $scope.thisTerm = result.data.filter(term => {
        return term.id == id
      })
      console.log($scope.thisTerm[0]);
      $scope.thisTerm = $scope.thisTerm[0]
    })
  })

})
